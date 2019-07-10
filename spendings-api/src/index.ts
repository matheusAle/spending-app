import { config } from 'dotenv-flow';
import 'module-alias/register';
config();

import ora from 'ora';

// @ts-ignore
global.loading = {
	start: (text: string) => {
		return ora(text).start();
	},
}

import './app';
