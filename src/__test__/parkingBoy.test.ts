import Car from '../car';
import TicketInvalidError from '../errors/ticketInvalidError';
import ParkingBoy from '../parkingBoy';
import ParkingLot from '../parkingLot';
import {ReportItem} from '../report/reportItem';
import character from '../report/roles';
import role from '../report/roles';
import Ticket from '../ticket';

describe('test ParkingBoy', () => {
	let parkingBoy: ParkingBoy;
	let parkingLot: ParkingLot;
	let car: Car;
	let ticket: Ticket;
	const id = '1234';

	beforeEach(() => {
		parkingLot = new ParkingLot();
		ticket = new Ticket(id);
		car = new Car();
		jest.spyOn(parkingLot, 'id', 'get').mockReturnValue(id);
		parkingLot.pickCar = jest.fn().mockReturnValue(car);
		parkingBoy = new ParkingBoy([parkingLot]);
	});

	test('should pick car', () => {
		expect(parkingBoy.pickCar(ticket)).toEqual(car);
	});

	test('should throw error when ticket invalid', () => {
		expect(() => {
			parkingBoy.pickCar(new Ticket('111'));
		}).toThrow(new TicketInvalidError('invalid ticket'));
	});

	test('should get parking boy report item', () => {
		jest.spyOn(parkingLot, 'availableStorage', 'get').mockReturnValue(2);
		jest.spyOn(parkingLot, 'totalStorage', 'get').mockReturnValue(3);

		expect(parkingBoy.reportItem).toEqual(new ReportItem(role.parkingBoy, 2, 3));
	});
});
