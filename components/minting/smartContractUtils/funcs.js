import {
  SmartContract,
  Address,
  ContractFunction,
  ProxyProvider
} from '@elrondnetwork/erdjs';

const network = process.env.NEXT_PUBLIC_ELROND_NETWORK || 'devnet';

const proxyUrl = `https://${
  network === 'devnet' ? 'devnet-' : ''
}api.elrond.com`;
const proxyTimeout = 30 * 1000; // 30 sec

export function smartContract() {
  return new SmartContract({
    address: new Address(process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS)
  });
}

export function elrondProvider() {
  return new ProxyProvider(proxyUrl, { timeout: proxyTimeout });
}

export async function runSCFunction({ functionName, args = [] }) {
  let response = await smartContract().runQuery(elrondProvider(), {
    func: new ContractFunction(functionName),
    args
  });

  return response;
}

export function parseSCResponseForBool(response) {
  return response === 1;
}
export function convertToDecimal(base64) {
  try {
    const hexString = Buffer.from(base64, 'base64').toString('hex');
    const hexDecimal = parseInt(hexString, 16);

    return hexDecimal;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function convertToDecimalToHex(dec) {
  let result = parseInt(dec, 10).toString(16);

  if (result.length % 2 === 1) {
    result = '0' + result;
  }
  return result;
}
