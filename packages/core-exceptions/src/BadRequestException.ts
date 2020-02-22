
export class BadRequestException extends Error {
	public code = 400;
	public type = 'bad_request';

	constructor(message: string, public data?: any) {
		super(message);
	}
}
