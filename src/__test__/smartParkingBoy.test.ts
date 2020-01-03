import Car from '../car';
import ParkingBoy from '../parkingBoy';
import ParkingLot from '../parkingLot';
import SmartParkingBoy from '../smartParkingBoy';

describe('test smart parking boy', () => {
	let parkingBoy: ParkingBoy;
	let firstParkingLot: ParkingLot;
	let secondParkingLot: ParkingLot;

	beforeEach(() => {
		firstParkingLot = new ParkingLot();
		secondParkingLot = new ParkingLot();

		parkingBoy = new SmartParkingBoy([firstParkingLot, secondParkingLot]);
	});

	test('should parking car in the first one when both has same storage', () => {
		const availableStorageOfTheFirstOne = firstParkingLot.availableStorage;
		const ticket = parkingBoy.parkCar(new Car());

		expect(firstParkingLot.availableStorage).toBe(availableStorageOfTheFirstOne - 1);
		expect(ticket).not.toBe(null);
	});

	test('should parking car in the first one when it has more storage', () => {
		jest.spyOn(secondParkingLot, 'availableStorage', 'get').mockReturnValue(9);

		const availableStorageOfTheFirstOne = firstParkingLot.availableStorage;
		const ticket = parkingBoy.parkCar(new Car());

		expect(firstParkingLot.availableStorage).toBe(availableStorageOfTheFirstOne - 1);
		expect(ticket).not.toBe(null);
	});

	test('should parking car in the second one when it has more storage', () => {
		jest.spyOn(firstParkingLot, 'availableStorage', 'get').mockReturnValue(1);

		const availableStorageOfTheSecondOne = secondParkingLot.availableStorage;
		parkingBoy.parkCar(new Car());

		expect(secondParkingLot.availableStorage).toBe(availableStorageOfTheSecondOne - 1);
	});

	test('should throw error when has no storage', () => {
		jest.spyOn(firstParkingLot, 'availableStorage', 'get').mockReturnValue(0);
		jest.spyOn(secondParkingLot, 'availableStorage', 'get').mockReturnValue(0);

		expect(() => {
			parkingBoy.parkCar(new Car());
		}).toThrow('parkingLot has no storage');
	});

});
