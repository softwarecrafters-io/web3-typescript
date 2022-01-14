import { AbiItem, AbiType } from '../dtos/contractDtos';
import web3 from 'web3';

export class CompiledContract {
	private constructor(readonly abi: AbiItem[], readonly bytecode: string) {}

	static create(abi: AbiItem[], bytecode: string) {
		return new CompiledContract(abi, bytecode);
	}

	getAPI() {
		return this.abi.map((abi) => ({
			name: abi.name,
			selector: this.generateFunctionSelector(abi.name),
		}));
	}

	private generateFunctionSelector(functionName: string) {
		return web3.utils.keccak256(functionName).slice(0, 10); // ALIAS
	}
}
