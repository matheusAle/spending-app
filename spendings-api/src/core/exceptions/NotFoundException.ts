
export class NotFoundException extends Error {

	constructor(message: string, public data?: any) {
		super(message);
	}
}
