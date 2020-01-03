import Manager from './manager';
import Report from './report/report';

export default class Director {
	private readonly manager: Manager;
	private readonly report: Report;

	constructor(manager: Manager) {
		this.manager = manager;
		this.report = new Report();
		this.report.manager = this.manager;
	}

	public generateReport(): string {
		return this.report.generate();
	}

	public generateMdReport(): string {
		return  this.report.generateMd();
	}
}
