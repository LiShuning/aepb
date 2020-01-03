import Car from '../car';
import ParkingLotHasNoStorageError from '../errors/parkingLotHasNoStorageError';
import TicketInvalidError from '../errors/ticketInvalidError';
import ParkingLot from '../parkingLot';
import {ReportItem} from '../report/reportItem';
import role from '../report/roles';
import Ticket from '../ticket';

describe('test parkingLot', () => {
	let parkingLot: ParkingLot;
	let car: Car;
	let ticket: Ticket;

	beforeEach(() => {
		parkingLot = new ParkingLot();
		car = new Car();
		ticket = parkingLot.parkCar(car);
	});

	test('should return ticket when parking car', () => {
		expect(ticket).not.toBe(null);
	});

	test('should pick car with ticket', () => {
		expect(parkingLot.pickCar(ticket)).toBe(car);
	});

	test('should pick right car when using right ticket', () => {
		const anotherCar = new Car();
		const anotherTicket = parkingLot.parkCar(anotherCar);

		expect(parkingLot.pickCar(ticket)).toBe(car);
		expect(parkingLot.pickCar(anotherTicket)).toBe(anotherCar);
	});

	test('should not pick car with invalid ticket', () => {
		const invalidTicket = new Ticket();
		expect(() => {
			parkingLot.pickCar(invalidTicket);
		}).toThrow(new TicketInvalidError('invalid ticket'));
	});

	test('should throw error when full', () => {
		jest.spyOn(parkingLot, 'availableStorage', 'get').mockReturnValue(0);

		expect(() => {
			parkingLot.parkCar(new Car());
		}).toThrow(new ParkingLotHasNoStorageError('parkingLot has no storage'));
	});

	test('should get parking lot item', () => {
		jest.spyOn(parkingLot, 'availableStorage', 'get').mockReturnValue(1);
		jest.spyOn(parkingLot, 'totalStorage', 'get').mockReturnValue(2);

		expect(parkingLot.reportItem).toEqual(new ReportItem(role.parkingLot, 1, 2));
	});

});
