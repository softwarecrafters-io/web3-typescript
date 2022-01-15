import path from 'path';
import fs from 'fs';
import solc from 'solc';
import { CompiledContract } from '../models/CompiledContract';

export class SolidityCompiler {
	private constructor(private readonly contractName: string, private readonly config: string) {}

	static createFromFile(contractName: string) {
		const filename = contractName + '.sol';
		const content = fs.readFileSync(
			path.resolve(__dirname, '../../../contracts', filename),
			'utf8'
		);
		const config = this.createConfiguration(contractName, content);
		return new SolidityCompiler(contractName, config);
	}

	static createFromMemory(contractName: string, contractContent: string) {
		const config = this.createConfiguration(contractName, contractContent);
		return new SolidityCompiler(contractName, config);
	}

	generateContractMetadata(): CompiledContract {
		const abi = this.compiledContractInformation()['abi'];
		const bytecode = this.compiledContractInformation()['evm']['bytecode']['object'];
		const opcode = this.compiledContractInformation()['evm']['bytecode']['opcodes'];
		return CompiledContract.create(abi, bytecode, opcode);
	}

	private compiledContractInformation() {
		const filename = this.contractName + '.sol';
		return this.compile()['contracts'][filename][this.contractName];
	}

	private compile() {
		const compiledContract = JSON.parse(solc.compile(this.config));
		const compilationErrors = compiledContract['errors'];
		if (compilationErrors) {
			const joinedErrors = compilationErrors.map((e) => e.message).join(' ');
			throw new Error(joinedErrors);
		}
		return compiledContract;
	}

	private static createConfiguration(contractName: string, content: string) {
		const filename = contractName + '.sol';
		const settings = {
			language: 'Solidity',
			sources: {
				[filename]: { content },
			},
			settings: {
				outputSelection: {
					'*': {
						'*': ['*'],
					},
				},
			},
		};
		return JSON.stringify(settings);
	}
}
