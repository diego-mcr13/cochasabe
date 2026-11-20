/**
 * Prueba de punta a punta del flujo de COCHA en testnet:
 *   1. Un usuario nuevo recibe su cuenta (Friendbot) y acepta COCHA.
 *   2. CochaSabe le paga 5 COCHA por una ayuda ("Me sirvió"), con memo.
 *   3. El usuario gasta 1 COCHA en destacar una pregunta (pago de vuelta a CochaSabe).
 *   4. El saldo y los movimientos se leen de la cadena.
 *
 *   npm run stellar:e2e
 */
import { Keypair } from '@stellar/stellar-sdk';
import {
  accountLink,
  cochaBalance,
  cochaMovements,
  fundWithFriendbot,
  payCocha,
  requireEnv,
  trustCocha,
  txLink,
} from '../../lib/stellar/cocha.ts';

async function main() {
  const issuerPublic = requireEnv('COCHA_ISSUER_PUBLIC');
  const distributor = Keypair.fromSecret(requireEnv('COCHA_DISTRIBUTOR_SECRET'));

  const user = Keypair.random();
  await fundWithFriendbot(user.publicKey());
  await trustCocha(user, issuerPublic);
  console.log(`1. Cuenta de usuario creada y acepta COCHA → ${accountLink(user.publicKey())}`);

  const reward = await payCocha({
    from: distributor,
    to: user.publicKey(),
    amount: '5',
    issuerPublicKey: issuerPublic,
    memo: 'ayuda:q-demo',
  });
  console.log(`2. Premio "Me sirvió" +5 COCHA → ${txLink(reward.hash)}`);

  const spend = await payCocha({
    from: user,
    to: distributor.publicKey(),
    amount: '1',
    issuerPublicKey: issuerPublic,
    memo: 'destacar:q-demo',
  });
  console.log(`3. Destacar pregunta −1 COCHA → ${txLink(spend.hash)}`);

  const balance = await cochaBalance(user.publicKey(), issuerPublic);
  const movements = await cochaMovements(user.publicKey(), issuerPublic);
  console.log(`4. Saldo en la cadena: ${balance} COCHA`);
  for (const m of movements) {
    console.log(`   ${m.direction === 'in' ? '+' : '−'}${m.amount}  memo="${m.memo}"  ${txLink(m.hash)}`);
  }

  if (Number(balance) !== 4) throw new Error(`Se esperaban 4 COCHA y hay ${balance}`);
  console.log('\n✓ Flujo COCHA completo en testnet.');
}

main().catch((err) => {
  console.error('✗', err.message);
  process.exit(1);
});
