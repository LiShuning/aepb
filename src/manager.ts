import Car from './car';
import ParkingBoyNotBelongsToTheManagerError from './errors/parkingBoyNotBelongsToTheManagerError';
import ParkingBoy from './parkingBoy';
import ParkingLot from './parkingLot';
import ParkingLotSelectMethod from './parkingLotSelectMethod';
import {ReportItem} from './report/reportItem';
import role from './report/roles';
import Ticket from './ticket';

export default class Manager extends ParkingBoy {
	private readonly _parkingBoys: ParkingBoy[];

	constructor(parkingBoys: ParkingBoy[], parkingLots: ParkingLot[] = []) {
		super(parkingLots);
		this._parkingBoys = parkingBoys;
	}

	public parkCarWithParkingBoy(car: Car, parkingBoy: ParkingBoy): Ticket {
		if (this._parkingBoys.indexOf(parkingBoy) < 0) {
			throw new ParkingBoyNotBelongsToTheManagerError('parking boy is not belongs to the manager');
		}
		return parkingBoy.parkCar(car);
	}

	public pickCarWithParkingBoy(ticket: Ticket, parkingBoy: ParkingBoy): Car {
		if (this._parkingBoys.indexOf(parkingBoy) < 0) {
			throw new ParkingBoyNotBelongsToTheManagerError('parking boy is not belongs to the manager');
		}
		return parkingBoy.pickCar(ticket);
	}

	protected selectParkingLot(): ParkingLot {
		return ParkingLotSelectMethod.selectByOrder(this.parkingLots);
	}

	get parkingBoys(): ParkingBoy[] {
		return this._parkingBoys;
	}

	get reportItem(): ReportItem {
		return new ReportItem(role.manager, this.availableStorage, this.totalStorage);
	}

	get availableStorage(): number {
		return this._parkingBoys.reduce((result, cur) => result += cur.availableStorage, 0) +
			this.parkingLots.reduce((result, cur) => result += cur.availableStorage, 0);
	}

	get totalStorage(): number {
		return this._parkingBoys.reduce((result, cur) => result += cur.totalStorage, 0) +
			this.parkingLots.reduce((result, cur) => result += cur.totalStorage, 0);
	}

}
