import { ClientWrapper } from '../core/ClientWrapper';
import { firstValueFrom } from 'rxjs';

describe('The client should', () => {
	const client = ClientWrapper.create('http://localhost:8545');

	it('gets accounts for a given node', async () => {
		const action = await firstValueFrom(client.getAccounts());

		expect(action).toMatchSnapshot();
	});

	it('gets balance for a given account', async () => {
		const account = (await firstValueFrom(client.getAccounts()))[0];

		const action = await firstValueFrom(client.getBalance(account));

		expect(action).toBe('0');
	});

	it('does not send transactions between accounts without enough funds', async (done) => {
		const accounts = await firstValueFrom(client.getAccounts());

		const action = client.sendTransaction(accounts[0], accounts[1], '1');

		action.subscribe({
			error: (err) => {
				expect(err).toBe('');
				done();
			},
		});
	});
});
