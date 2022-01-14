import { SolidityCompiler } from '../wrappers/SolidityCompiler';
import { createContract, createContractWithoutLicence } from './Fixtures';

describe('The solidity compiler should', () => {
	describe('from file', () => {
		it('generates contract metadata for a given contract', () => {
			const result = SolidityCompiler.createFromFile('Hello').generateContractMetadata();

			expect(result).toMatchSnapshot();
		});

		it('generates byte code for a given contract', () => {
			const result = SolidityCompiler.createFromFile('Hello').generateByteCode();

			expect(result).toBe(
				'6080604052600160005534801561001557600080fd5b50610133806100256000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806355241077146037578063d2902e8b14604f575b600080fd5b604d60048036038101906049919060af565b6069565b005b60556073565b6040516060919060e4565b60405180910390f35b8060008190555050565b60005481565b600080fd5b6000819050919050565b608f81607e565b8114609957600080fd5b50565b60008135905060a9816088565b92915050565b60006020828403121560c25760c16079565b5b600060ce84828501609c565b91505092915050565b60de81607e565b82525050565b600060208201905060f7600083018460d7565b9291505056fea2646970667358221220029e694492f6b562e157f0925ea1dbe032e1f2c7afa8393476e6c26f72a0ce7d64736f6c634300080b0033'
			);
		});

		it('generates op codes for a given contract', () => {
			const result = SolidityCompiler.createFromFile('Hello').generateOpCodes();

			expect(result).toBe(
				'PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x1 PUSH1 0x0 SSTORE CALLVALUE DUP1 ISZERO PUSH2 0x15 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x133 DUP1 PUSH2 0x25 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH1 0x32 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x55241077 EQ PUSH1 0x37 JUMPI DUP1 PUSH4 0xD2902E8B EQ PUSH1 0x4F JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x4D PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH1 0x49 SWAP2 SWAP1 PUSH1 0xAF JUMP JUMPDEST PUSH1 0x69 JUMP JUMPDEST STOP JUMPDEST PUSH1 0x55 PUSH1 0x73 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x60 SWAP2 SWAP1 PUSH1 0xE4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST DUP1 PUSH1 0x0 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x8F DUP2 PUSH1 0x7E JUMP JUMPDEST DUP2 EQ PUSH1 0x99 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH1 0xA9 DUP2 PUSH1 0x88 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH1 0xC2 JUMPI PUSH1 0xC1 PUSH1 0x79 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH1 0xCE DUP5 DUP3 DUP6 ADD PUSH1 0x9C JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0xDE DUP2 PUSH1 0x7E JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH1 0xF7 PUSH1 0x0 DUP4 ADD DUP5 PUSH1 0xD7 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 MUL SWAP15 PUSH10 0x4492F6B562E157F0925E LOG1 0xDB 0xE0 ORIGIN 0xE1 CALLCODE 0xC7 0xAF 0xA8 CODECOPY CALLVALUE PUSH23 0xE6C26F72A0CE7D64736F6C634300080B00330000000000 '
			);
		});

		it('generates ABI for a given contract', () => {
			const result = SolidityCompiler.createFromFile('Hello').generateABI();

			expect(result).toEqual([
				{
					inputs: [],
					name: '_myValue',
					outputs: [
						{
							internalType: 'uint256',
							name: '',
							type: 'uint256',
						},
					],
					stateMutability: 'view',
					type: 'function',
				},
				{
					inputs: [
						{
							internalType: 'uint256',
							name: 'myValue',
							type: 'uint256',
						},
					],
					name: 'setValue',
					outputs: [],
					stateMutability: 'nonpayable',
					type: 'function',
				},
			]);
		});
	});

	describe('from memory', () => {
		it('generates contract metadata for a given contract', () => {
			const contract = SolidityCompiler.createFromMemory('Hello', createContract());

			expect(contract.generateContractMetadata()).toMatchSnapshot();
		});

		it('generates byte code for a given contract', () => {
			const contract = SolidityCompiler.createFromMemory('Hello', createContract());

			expect(contract.generateByteCode()).toBe(
				'6080604052600160005534801561001557600080fd5b50610133806100256000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806355241077146037578063d2902e8b14604f575b600080fd5b604d60048036038101906049919060af565b6069565b005b60556073565b6040516060919060e4565b60405180910390f35b8060008190555050565b60005481565b600080fd5b6000819050919050565b608f81607e565b8114609957600080fd5b50565b60008135905060a9816088565b92915050565b60006020828403121560c25760c16079565b5b600060ce84828501609c565b91505092915050565b60de81607e565b82525050565b600060208201905060f7600083018460d7565b9291505056fea2646970667358221220215891e83ae0679e2f80fb240d04236d93673fbbf97eb3510fd88a8bf60ed85364736f6c634300080b0033'
			);
		});

		it('generates op codes for a given contract', () => {
			const contract = SolidityCompiler.createFromMemory('Hello', createContract());

			expect(contract.generateOpCodes()).toBe(
				'PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x1 PUSH1 0x0 SSTORE CALLVALUE DUP1 ISZERO PUSH2 0x15 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x133 DUP1 PUSH2 0x25 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH1 0x32 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x55241077 EQ PUSH1 0x37 JUMPI DUP1 PUSH4 0xD2902E8B EQ PUSH1 0x4F JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x4D PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH1 0x49 SWAP2 SWAP1 PUSH1 0xAF JUMP JUMPDEST PUSH1 0x69 JUMP JUMPDEST STOP JUMPDEST PUSH1 0x55 PUSH1 0x73 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x60 SWAP2 SWAP1 PUSH1 0xE4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST DUP1 PUSH1 0x0 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x8F DUP2 PUSH1 0x7E JUMP JUMPDEST DUP2 EQ PUSH1 0x99 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH1 0xA9 DUP2 PUSH1 0x88 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH1 0xC2 JUMPI PUSH1 0xC1 PUSH1 0x79 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH1 0xCE DUP5 DUP3 DUP6 ADD PUSH1 0x9C JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0xDE DUP2 PUSH1 0x7E JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH1 0xF7 PUSH1 0x0 DUP4 ADD DUP5 PUSH1 0xD7 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0x21 PC SWAP2 0xE8 GASPRICE 0xE0 PUSH8 0x9E2F80FB240D0423 PUSH14 0x93673FBBF97EB3510FD88A8BF60E 0xD8 MSTORE8 PUSH5 0x736F6C6343 STOP ADDMOD SIGNEXTEND STOP CALLER '
			);
		});

		it('generates ABI for a given contract', () => {
			const contract = SolidityCompiler.createFromMemory('Hello', createContract());

			expect(contract.generateABI()).toEqual([
				{
					inputs: [],
					name: '_myValue',
					outputs: [
						{
							internalType: 'uint256',
							name: '',
							type: 'uint256',
						},
					],
					stateMutability: 'view',
					type: 'function',
				},
				{
					inputs: [
						{
							internalType: 'uint256',
							name: 'myValue',
							type: 'uint256',
						},
					],
					name: 'setValue',
					outputs: [],
					stateMutability: 'nonpayable',
					type: 'function',
				},
			]);
		});
		it('throws error when contract does not have a licence', () => {
			const contract = SolidityCompiler.createFromMemory('Hello', createContractWithoutLicence());

			expect(() => contract.generateABI()).toThrow();
		});
	});
});
