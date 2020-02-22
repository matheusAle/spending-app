
export class ServerErrorException extends Error {

	constructor(message: string, public data: any) {
		super(message);
	}
}
