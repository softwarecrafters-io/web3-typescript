import Web3 from 'web3';
import { from as fromPromise, map, Observable, share } from 'rxjs';

export class EthereumClient {
	private readonly weiConversion = 1000000000000000000;

	constructor(private client: Web3) {}

	static create(urlNode: string) {
		const provider = new Web3.providers.HttpProvider(urlNode);
		const client = new Web3(provider);
		return new EthereumClient(client);
	}

	getAccounts() {
		return fromPromise(this.client.eth.getAccounts());
	}

	getBalance(walletAddress: string) {
		return fromPromise(this.client.eth.getBalance(walletAddress, 'latest')).pipe(
			map((balance) => this.toEther(balance))
		);
	}

	private toEther(weiValue: string) {
		return Number(weiValue) / this.weiConversion;
	}

	sendTransaction(from: string, to: string, value: number) {
		value = this.toWei(value);
		return fromPromise(
			this.client.eth.sendTransaction({
				from,
				to,
				value,
			})
		);
	}

	private toWei(etherValue: number) {
		return etherValue * this.weiConversion;
	}
}
