import Web3 from 'web3';
import { from as fromPromise, map, Observable } from 'rxjs';
import { CompiledContract } from '../models/CompiledContract';
import { AbiItem } from '../dtos/contractDtos';

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

	deployContractFrom(
		contract: CompiledContract,
		accountAddress: string,
		gas: number
	): Observable<string> {
		return fromPromise(
			new this.client.eth.Contract(contract.abi as any)
				.deploy({ data: contract.bytecode })
				.send({ from: accountAddress, gas })
		).pipe(map((c) => c.options.address));
	}

	sendDataToContractMethod<T>(
		account: Account,
		contractInstance: ContractIntance,
		method: Method<T>
	) {
		return fromPromise(
			new this.client.eth.Contract(contractInstance.abi as any, contractInstance.address).methods[
				method.name
			](method.value).send({ from: account.from, gas: account.gas })
		);
	}

	getDataFromContractMethod<T>(
		account: Account,
		contractInstance: ContractIntance,
		methodName: string
	) {
		return fromPromise(
			new this.client.eth.Contract(contractInstance.abi as any, contractInstance.address).methods[
				methodName
			]().call({ from: account.from, gas: account.gas })
		);
	}
}

type Account = {
	from: string;
	gas: number;
};

type ContractIntance = {
	address: string;
	abi: AbiItem[];
};

type Method<T> = {
	name: string;
	value: T;
};
