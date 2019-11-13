
export class DuplicatedException extends Error {

	public code = 409;
	public type = 'conflict';

	constructor(message: string, public data?: any) {
		super(message);
	}
}
