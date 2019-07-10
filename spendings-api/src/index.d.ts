import ora from 'ora';

// tslint:disable-next-line:no-namespace
declare namespace NodeJS {
    interface Global {
		loading: {
			// @ts-ignore
			start(message): ora;
		};
	}
}
