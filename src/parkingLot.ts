import uuidV1 from 'uuid/v1';
import Car from './car';
import ParkingLotHasNoStorageError from './errors/parkingLotHasNoStorageError';
import TicketInvalidError from './errors/ticketInvalidError';
import {ReportItem} from './report/reportItem';
import role from './report/roles';
import Ticket from './ticket';

export default class ParkingLot {
	private cars: Map<Ticket, Car> = new Map();
	private readonly storage: number;
	private _id: string;

	constructor(storage: number = 10) {
		this.storage = storage;
	}

	public parkCar(car: Car): Ticket {
		if (this.availableStorage <= 0) {
			throw new ParkingLotHasNoStorageError('parkingLot has no storage');
		}
		this._id = uuidV1();
		const ticket = new Ticket(this.id);
		this.cars.set(ticket, car);
		return ticket;
	}

	public pickCar(ticket: Ticket): Car {
		if (!this.cars.has(ticket)) {
			throw new TicketInvalidError('invalid ticket');
		}

		const car = this.cars.get(ticket);
		this.cars.delete(ticket);
		return car;
	}

	get availableStorage(): number {
		return this.storage - this.cars.size;
	}

	get id(): string {
		return this._id;
	}

	get restRate(): number {
		return this.cars.size / this.storage;
	}

	get totalStorage(): number {
		return this.storage;
	}

	get reportItem(): ReportItem {
		return new ReportItem(role.parkingLot, this.availableStorage, this.totalStorage);
	}
}
