/**
 * COCHA en Stellar testnet: utilidades compartidas por los scripts y, más adelante,
 * por las funciones del servidor en Vercel (/api/stellar/*).
 *
 * Modelo: la emisora crea COCHA y la distribuidora paga los premios.
 * Cada premio es un pago de COCHA con un memo que lo enlaza a su acción (por ejemplo, "ayuda:q123").
 * Solo testnet: nunca usar estas claves ni este flujo con dinero real.
 */
import {
  Asset,
  BASE_FEE,
  Horizon,
  Keypair,
  Memo,
  Networks,
  Operation,
  TransactionBuilder,
} from '@stellar/stellar-sdk';

export const HORIZON_URL = 'https://horizon-testnet.stellar.org';
export const FRIENDBOT_URL = 'https://friendbot.stellar.org';
export const NETWORK = Networks.TESTNET;
export const EXPLORER = 'https://stellar.expert/explorer/testnet';
export const ASSET_CODE = 'COCHA';

export const server = new Horizon.Server(HORIZON_URL);

export function cochaAsset(issuerPublicKey: string): Asset {
  return new Asset(ASSET_CODE, issuerPublicKey);
}

export const txLink = (hash: string) => `${EXPLORER}/tx/${hash}`;
export const accountLink = (publicKey: string) => `${EXPLORER}/account/${publicKey}`;

/** Lee una variable de entorno obligatoria y falla con un mensaje claro. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta ${name}. Ejecuta "npm run stellar:setup" primero.`);
  return value;
}

/** El memo de texto de Stellar admite como máximo 28 bytes. */
export function memoFor(action: string): Memo {
  if (new TextEncoder().encode(action).length > 28) {
    throw new Error(`El memo "${action}" pasa de 28 bytes`);
  }
  return Memo.text(action);
}

export async function accountExists(publicKey: string): Promise<boolean> {
  try {
    await server.loadAccount(publicKey);
    return true;
  } catch (err: any) {
    if (err?.response?.status === 404) return false;
    throw err;
  }
}

/** Fondea una cuenta nueva con Friendbot (solo testnet). Reintenta porque Friendbot limita. */
export async function fundWithFriendbot(publicKey: string, attempts = 3): Promise<void> {
  for (let i = 1; i <= attempts; i++) {
    const res = await fetch(`${FRIENDBOT_URL}?addr=${encodeURIComponent(publicKey)}`);
    if (res.ok) return;
    if (await accountExists(publicKey)) return; // ya estaba fondeada
    if (i === attempts) throw new Error(`Friendbot falló (${res.status}): ${await res.text()}`);
    await new Promise((r) => setTimeout(r, 1500 * i));
  }
}

async function submit(source: Keypair, build: (b: TransactionBuilder) => TransactionBuilder) {
  const account = await server.loadAccount(source.publicKey());
  const tx = build(new TransactionBuilder(account, { fee: BASE_FEE, networkPassphrase: NETWORK }))
    .setTimeout(60)
    .build();
  tx.sign(source);
  try {
    return await server.submitTransaction(tx);
  } catch (err: any) {
    const codes = err?.response?.data?.extras?.result_codes;
    throw new Error(`Stellar rechazó la transacción: ${JSON.stringify(codes ?? err?.message)}`);
  }
}

/** La cuenta acepta COCHA (trustline). Es obligatorio antes de recibir el activo. */
export function trustCocha(account: Keypair, issuerPublicKey: string) {
  return submit(account, (b) =>
    b.addOperation(Operation.changeTrust({ asset: cochaAsset(issuerPublicKey) })),
  );
}

export function hasCochaTrustline(
  balances: Horizon.HorizonApi.BalanceLine[],
  issuerPublicKey: string,
): boolean {
  return balances.some(
    (b) => 'asset_code' in b && b.asset_code === ASSET_CODE && b.asset_issuer === issuerPublicKey,
  );
}

/** Pago de COCHA con memo. `amount` es un string decimal ("5", "0.5"). */
export function payCocha(opts: {
  from: Keypair;
  to: string;
  amount: string;
  issuerPublicKey: string;
  memo: string;
}) {
  return submit(opts.from, (b) =>
    b
      .addOperation(
        Operation.payment({
          destination: opts.to,
          asset: cochaAsset(opts.issuerPublicKey),
          amount: opts.amount,
        }),
      )
      .addMemo(memoFor(opts.memo)),
  );
}

/** Saldo de COCHA leído de la cadena (la fuente de verdad de los cochapuntos). */
export async function cochaBalance(publicKey: string, issuerPublicKey: string): Promise<string> {
  const account = await server.loadAccount(publicKey);
  const line = account.balances.find(
    (b) => 'asset_code' in b && b.asset_code === ASSET_CODE && b.asset_issuer === issuerPublicKey,
  );
  return line ? line.balance : '0';
}

export type CochaMovement = {
  hash: string;
  direction: 'in' | 'out';
  amount: string;
  counterparty: string;
  memo: string | undefined;
  at: string;
};

/** Movimientos de COCHA de una cuenta, del más nuevo al más viejo, con su memo. */
export async function cochaMovements(
  publicKey: string,
  issuerPublicKey: string,
  limit = 20,
): Promise<CochaMovement[]> {
  const page = await server.payments().forAccount(publicKey).order('desc').limit(limit).call();
  const out: CochaMovement[] = [];
  for (const op of page.records) {
    if (op.type !== 'payment') continue;
    const p = op as Horizon.ServerApi.PaymentOperationRecord;
    if (p.asset_code !== ASSET_CODE || p.asset_issuer !== issuerPublicKey) continue;
    const tx = await p.transaction();
    out.push({
      hash: p.transaction_hash,
      direction: p.to === publicKey ? 'in' : 'out',
      amount: p.amount,
      counterparty: p.to === publicKey ? p.from : p.to,
      memo: tx.memo,
      at: p.created_at,
    });
  }
  return out;
}
