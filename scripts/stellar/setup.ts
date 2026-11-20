/**
 * Crea (o reutiliza) en testnet la emisora y la distribuidora de COCHA, y emite el suministro inicial.
 * Es idempotente: si las cuentas de .env ya existen, no las vuelve a crear.
 * Si la testnet se reinició, borra las variables COCHA_* de .env y vuelve a ejecutarlo.
 *
 *   npm run stellar:setup
 */
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { Keypair } from '@stellar/stellar-sdk';
import {
  accountExists,
  accountLink,
  cochaBalance,
  fundWithFriendbot,
  hasCochaTrustline,
  payCocha,
  server,
  trustCocha,
  txLink,
} from '../../lib/stellar/cocha.ts';

const ENV_FILE = '.env';
const INITIAL_SUPPLY = '1000000'; // COCHA que la emisora entrega a la distribuidora

function saveEnv(name: string, value: string) {
  const current = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, 'utf8') : '';
  if (new RegExp(`^${name}=`, 'm').test(current)) return;
  appendFileSync(ENV_FILE, `${current && !current.endsWith('\n') ? '\n' : ''}${name}=${value}\n`);
  process.env[name] = value;
}

async function ensureAccount(label: string, envName: string): Promise<Keypair> {
  const secret = process.env[envName];
  if (secret) {
    const kp = Keypair.fromSecret(secret);
    if (await accountExists(kp.publicKey())) {
      console.log(`✓ ${label} ya existe: ${kp.publicKey()}`);
      return kp;
    }
    throw new Error(
      `${label} está en .env pero no existe en testnet (¿se reinició la red?). ` +
        `Borra las variables COCHA_* de .env y vuelve a ejecutar.`,
    );
  }
  const kp = Keypair.random();
  await fundWithFriendbot(kp.publicKey());
  saveEnv(envName, kp.secret());
  console.log(`✓ ${label} creada y fondeada: ${kp.publicKey()}`);
  return kp;
}

async function main() {
  const issuer = await ensureAccount('Emisora', 'COCHA_ISSUER_SECRET');
  const distributor = await ensureAccount('Distribuidora', 'COCHA_DISTRIBUTOR_SECRET');
  saveEnv('COCHA_ISSUER_PUBLIC', issuer.publicKey());
  saveEnv('COCHA_DISTRIBUTOR_PUBLIC', distributor.publicKey());

  const dist = await server.loadAccount(distributor.publicKey());
  if (!hasCochaTrustline(dist.balances, issuer.publicKey())) {
    await trustCocha(distributor, issuer.publicKey());
    console.log('✓ La distribuidora acepta COCHA');
  }

  const balance = await cochaBalance(distributor.publicKey(), issuer.publicKey());
  if (Number(balance) === 0) {
    const res = await payCocha({
      from: issuer,
      to: distributor.publicKey(),
      amount: INITIAL_SUPPLY,
      issuerPublicKey: issuer.publicKey(),
      memo: 'emision:inicial',
    });
    console.log(`✓ Emitidos ${INITIAL_SUPPLY} COCHA → ${txLink(res.hash)}`);
  } else {
    console.log(`✓ La distribuidora ya tiene ${balance} COCHA`);
  }

  console.log(`\nEmisora:       ${accountLink(issuer.publicKey())}`);
  console.log(`Distribuidora: ${accountLink(distributor.publicKey())}`);
  console.log('Claves guardadas en .env (no se suben al repo).');
}

main().catch((err) => {
  console.error('✗', err.message);
  process.exit(1);
});
