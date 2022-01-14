import { CreateCompiledContract } from './Fixtures';

describe('The Contract', () => {
	it('gets API', () => {
		const contract = CreateCompiledContract();

		expect(contract.getAPI()).toEqual([
			{ name: '_myValue', selector: '0xc03d2a80' },
			{ name: 'setValue', selector: '0x0af91e91' },
		]);
	});
});
