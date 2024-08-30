export interface IController<Response> {
	handle(...args: any[]): Promise<Response>;
}
