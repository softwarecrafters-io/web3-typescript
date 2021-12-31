import Web3 from 'web3';
import { from, map, Observable } from 'rxjs';

export class ClientWrapper {
	constructor(private client: Web3) {}

	static create(urlNode: string) {
		const provider = new Web3.providers.HttpProvider(urlNode);
		const client = new Web3(provider);
		return new ClientWrapper(client);
	}

	getAccounts() {
		return from(this.client.eth.getAccounts());
	}

	getBalance(walletAddress: string) {
		return from(this.client.eth.getBalance(walletAddress, 'latest'));
	}

	sendTransaction(fromAddress: string, toAddress: string, value: string) {
		return from(this.client.eth.sendTransaction({ from: fromAddress, to: toAddress, value }));
	}
}
