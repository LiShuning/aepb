import Manager from '../manager';
import ReportGenerator from './reportGenerator';

export default class Report {
	private generator: ReportGenerator;

	set manager(manager: Manager) {
		this.generator = new ReportGenerator(manager);
	}

	public generate(): string {
		return this.generator.generateNormalReport();
	}

	public generateMd(): string {
		return this.generator.generateMdReport();
	}
}
