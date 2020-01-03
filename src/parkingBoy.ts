import Car from './car';
import TicketInvalidError from './errors/ticketInvalidError';
import ParkingLot from './parkingLot';
import {ReportItem} from './report/reportItem';
import role from './report/roles';
import Ticket from './ticket';

export default class ParkingBoy {
	protected _parkingLots: ParkingLot[] = [];

	constructor(parkingLots: ParkingLot[]) {
		this._parkingLots = parkingLots;
	}

	public parkCar(car: Car): Ticket {
		return this.selectParkingLot() &&
			this.selectParkingLot().parkCar(car);
	}

	public pickCar(ticket: Ticket): Car {
		const parkingLot = this.parkingLots.find((item) => item.id === ticket.id);
		if (!parkingLot) {
			throw new TicketInvalidError('invalid ticket');
		}
		return parkingLot.pickCar(ticket);
	}

	protected selectParkingLot(): ParkingLot {
		return null;
	}

	get parkingLots(): ParkingLot[] {
		return this._parkingLots;
	}

	get reportItem(): ReportItem {
		return new ReportItem(role.parkingBoy, this.availableStorage, this.totalStorage);
	}

	get availableStorage(): number {
		return this.parkingLots.reduce((pre, cur) => pre += cur.availableStorage, 0);
	}

	get totalStorage(): number {
		return this.parkingLots.reduce((pre, cur) => pre += cur.totalStorage, 0);
	}

}
