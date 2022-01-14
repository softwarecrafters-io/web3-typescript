import { CompiledContract } from '../models/CompiledContract';
import { AbiItem } from '../dtos/contractDtos';

export function createContract(contractName = 'Hello') {
	return `
			// SPDX-License-Identifier: Unlicense
			pragma solidity ^0.8.0;

			contract ${contractName} {
					uint public _myValue = 1;
			
					function setValue(uint myValue) public {
							_myValue = myValue ;
					}
			}
		`;
}

export function createContractWithoutLicence() {
	return `
			pragma solidity ^0.8.0;

			contract Hello {
					uint public _myValue = 1;
			
					function setValue(uint myValue) public {
							_myValue = myValue ;
					}
			}
		`;
}

export function CreateCompiledContract() {
	const abi = [
		{
			inputs: [],
			name: '_myValue',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [{ internalType: 'uint256', name: 'myValue', type: 'uint256' }],
			name: 'setValue',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
	] as AbiItem[];
	const bytecode =
		'6080604052600160005534801561001557600080fd5b5060b1806100246000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806355241077146037578063d2902e8b146049575b600080fd5b604760423660046063565b600055565b005b605160005481565b60405190815260200160405180910390f35b600060208284031215607457600080fd5b503591905056fea264697066735822122046694543b82b6d2a2c58df41b5b5ff968f469254a9b0d6caa19d81ce742bd80d64736f6c634300080b0033';
	return CompiledContract.create(abi, bytecode);
}
