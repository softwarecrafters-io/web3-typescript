import { AbiItem } from '../dtos/contractDtos';
import { keccak256 } from '../hash';

export class CompiledContract {
	private constructor(
		readonly abi: AbiItem[],
		readonly bytecode: string,
		readonly opcodes: string
	) {}

	static create(abi: AbiItem[], bytecode: string, opcodes: string) {
		return new CompiledContract(abi, bytecode, opcodes);
	}

	getAPI() {
		return this.abi.map((abi) => ({
			name: abi.name,
			selector: this.generateFunctionAlias(abi.name),
		}));
	}

	private generateFunctionAlias(functionName: string) {
		return keccak256(functionName).slice(0, 10);
	}
}
