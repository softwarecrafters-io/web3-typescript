import { ClientWrapper } from '../core/ClientWrapper';
import { firstValueFrom } from 'rxjs';
import ganache from 'ganache-cli';

describe('The Ethereum Client should', () => {
	const hostname = 'localhost';
	const port = 8545;
	const ethereumClient = ClientWrapper.create(`http://${hostname}:${port}`);
	const defaultBalance = 10;
	let ethereumNode;

	beforeAll(() => {
		ethereumNode = ganache.server({
			seed: 'customSeed',
			total_accounts: 5,
			gasPrice: 0,
			default_balance_ether: defaultBalance,
		});
		ethereumNode.listen(port, hostname);
	});

	afterAll(() => {
		ethereumNode.close();
	});

	it('gets accounts for a given node', async () => {
		const action = await firstValueFrom(ethereumClient.getAccounts());

		expect(action).toEqual([
			'0x1f768cE0955A77aA02089426DfE7A06C40dd1f5D',
			'0x9C6B4577c9222D1EDfE294c7AdF379FFbe91A38f',
			'0x42Cbe3292Ab83f5Aba79873Ff49937ec4C10a7CA',
			'0x423dCfc71FF683331926ae37c92F5b94702C52d2',
			'0x8d298a308f635daFeFEEE6335E329cdAc5bBCB59',
		]);
	});

	it('gets balance for a given account', async () => {
		const account = (await firstValueFrom(ethereumClient.getAccounts()))[0];

		const action = await firstValueFrom(ethereumClient.getBalance(account));

		expect(action).toBe(defaultBalance);
	});

	it('send transactions between different accounts', async () => {
		const accounts = await firstValueFrom(ethereumClient.getAccounts());
		const account1 = accounts[1];
		const account2 = accounts[2];

		const transaction = await firstValueFrom(ethereumClient.sendTransaction(account1, account2, 1));
		const balanceAccount1 = await firstValueFrom(ethereumClient.getBalance(account1));
		const balanceAccount2 = await firstValueFrom(ethereumClient.getBalance(account2));

		expect(transaction.status).toBe(true);
		expect(balanceAccount1).toBe(9);
		expect(balanceAccount2).toBe(11);
	});
});
