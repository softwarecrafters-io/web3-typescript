import web3 from 'web3';

export function keccak256(text: string) {
	return web3.utils.keccak256(text);
}
