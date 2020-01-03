import Manager from '../manager';
import symbols from './symbols';

export default class ReportGenerator {
	private manager: Manager;

	constructor(manager: Manager) {
		this.manager = manager;
	}

	public generateNormalReport(): string {
		return this.generate(symbols.space);
	}

	public generateMdReport(): string {
		return this.generate(symbols.md);
	}

	private generate(symbol: string): string {
		let result = '';
		result += symbol + this.manager.reportItem.reportLine.concat('\n');

		result += symbol.repeat(2) + this.manager.parkingLots.reduce((pl, cur) =>
			pl += cur.reportItem.reportLine.concat('\n'), '');

		result += symbol.repeat(3) + this.manager.parkingBoys.reduce((pb, cur) => {
			pb += cur.reportItem.reportLine.concat('\n');
			return pb + cur.parkingLots.reduce((pl, current) =>
				pl += symbol.repeat(4) + current.reportItem.reportLine.concat('\n'), '');
		}, '');
		return result.slice(0, result.length - 1);
	}
}
