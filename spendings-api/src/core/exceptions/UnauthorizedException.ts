
export class UnauthorizedException extends Error {

	constructor(message: string, public data?: any) {
		super(message);
	}
}
