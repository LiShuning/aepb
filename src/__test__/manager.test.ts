import Car from '../car';
import ParkingBoyNotBelongsToTheManagerError from '../errors/parkingBoyNotBelongsToTheManagerError';
import ParkingLotHasNoStorageError from '../errors/parkingLotHasNoStorageError';
import Manager from '../manager';
import ParkingBoy from '../parkingBoy';
import ParkingLot from '../parkingLot';
import {ReportItem} from '../report/reportItem';
import role from '../report/roles';
import Ticket from '../ticket';

describe('test manager', () => {
	let manager: Manager;
	let parkingBoy: ParkingBoy;
	let parkingLot: ParkingLot;

	beforeEach(() => {
		parkingBoy = new ParkingBoy([new ParkingLot()]);
		parkingLot = new ParkingLot();
		manager = new Manager([parkingBoy], [parkingLot]);
	});

	test('should park car and pick car', () => {
		const car =	new Car();
		const ticket = manager.parkCar(car);

		expect(ticket).not.toBe(null);
		expect(manager.pickCar(ticket)).toBe(car);
	});

	test('should throw error when has no storage', () => {
		jest.spyOn(parkingLot, 'availableStorage', 'get').mockReturnValue(0);
		expect(() => {
			manager.parkCar(new Car());
		}).toThrow(new ParkingLotHasNoStorageError('parkingLot has no storage'));
	});

	test('should park car with parking boy', () => {
		const car = new Car();
		const ticket = new Ticket('123');
		parkingBoy.parkCar = jest.fn().mockReturnValue(ticket);
		parkingBoy.pickCar = jest.fn().mockReturnValue(car);

		const returnedTicket = manager.parkCarWithParkingBoy(car, parkingBoy);

		expect(returnedTicket).not.toBe(null);
		expect(parkingBoy.pickCar(returnedTicket)).toBe(car);
	});

	test('should pick car with parking boy', () => {
		const car = new Car();
		const ticket = new Ticket('123');
		parkingBoy.parkCar = jest.fn().mockReturnValue(ticket);
		parkingBoy.pickCar = jest.fn().mockReturnValue(car);

		const returnedCar = manager.pickCarWithParkingBoy(ticket, parkingBoy);

		expect(returnedCar).toBe(car);
	});

	test('should throw error when the parking boy is not belongs to the manager', () => {
		expect(() => {
			manager.parkCarWithParkingBoy(new Car(), new ParkingBoy([parkingLot]));
		}).toThrow(new ParkingBoyNotBelongsToTheManagerError('parking boy is not belongs to the manager'));

		expect(() => {
			manager.pickCarWithParkingBoy(new Ticket('11'), new ParkingBoy([parkingLot]));
		}).toThrow(new ParkingBoyNotBelongsToTheManagerError('parking boy is not belongs to the manager'));
	});

	test('should get report item', () => {
		jest.spyOn(parkingLot, 'availableStorage', 'get').mockReturnValue(3);
		jest.spyOn(parkingLot, 'totalStorage', 'get').mockReturnValue(3);

		const _parkingLot = new ParkingLot(3);
		jest.spyOn(_parkingLot, 'availableStorage', 'get').mockReturnValue(2);
		jest.spyOn(parkingBoy, 'parkingLots', 'get').mockReturnValue([_parkingLot])

		expect(manager.reportItem).toEqual(new ReportItem(role.manager, 5, 6));
	});
});
