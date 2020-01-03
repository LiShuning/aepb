import Director from '../director';
import Manager from '../manager';
import ParkingBoy from '../parkingBoy';
import ParkingLot from '../parkingLot';
import {ReportItem} from '../report/reportItem';
import role from '../report/roles';

describe('test director', () => {
	let director: Director;
	let manager: Manager;

	jest.mock('../manager');

	beforeEach(() => {
		const parkingLot = new ParkingLot();
		const parkingBoy = new ParkingBoy([parkingLot]);
		manager = new Manager([parkingBoy], [parkingLot]);
		director = new Director(manager);
	});

	test('should generate report', () => {
		jest.spyOn(manager, 'reportItem', 'get').mockReturnValue(new ReportItem(role.manager, 5, 6, [
			new ReportItem(role.parkingLot, 3, 3),
			new ReportItem(role.parkingBoy, 2, 3,
				[new ReportItem(role.parkingLot, 2, 3)]),
		]));

		expect(director.generateReport()).toEqual(' M 5 6\n' +
			'  P 10 10\n' +
			'   B 10 10\n' +
			'    P 10 10');
	});

	test('should generate markdown report', () => {
		jest.spyOn(manager, 'reportItem', 'get').mockReturnValue(new ReportItem(role.manager, 5, 6, [
			new ReportItem(role.parkingLot, 3, 3),
			new ReportItem(role.parkingBoy, 2, 3,
				[new ReportItem(role.parkingLot, 2, 3)]),
		]));

		expect(director.generateMdReport()).toEqual('#M 5 6\n' +
			'##P 10 10\n' +
			'###B 10 10\n' +
			'####P 10 10');
	});

});
