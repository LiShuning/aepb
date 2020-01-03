export class ReportItem {
	private readonly _role: string;
	private readonly _availableStorage: number;
	private readonly _totalStorage: number;

	constructor(role: string, availableStorage: number, totalStorage: number, subReportItems: ReportItem[] = null) {
		this._role = role;
		this._availableStorage = availableStorage;
		this._totalStorage = totalStorage;
	}

	get role(): string {
		return this._role;
	}

	get availableStorage(): number {
		return this._availableStorage;
	}

	get totalStorage(): number {
		return this._totalStorage;
	}

	get reportLine(): string {
		return `${this.role} ${this.availableStorage} ${this.totalStorage}`;
	}
}
