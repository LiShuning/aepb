import Car from '../car';
import ParkingLot from '../parkingLot';
import SuperParkingBoy from '../superParkingBoy';

describe('test super parking boy', () => {
	let parkingBoy;
	let firstParkingLot;
	let secondParkingLot;

	beforeEach(() => {
		firstParkingLot = new ParkingLot();
		secondParkingLot = new ParkingLot();

		parkingBoy = new SuperParkingBoy([firstParkingLot, secondParkingLot]);
	});

	test('should parking car in the first one when both has same rest rate', () => {
		firstParkingLot.getRestRate = jest.fn().mockReturnValue(0.1);
		secondParkingLot.getRestRate = jest.fn().mockReturnValue(0.1);

		const availableStorageOfTheFirstOne = firstParkingLot.availableStorage;
		const ticket = parkingBoy.parkCar(new Car());

		expect(firstParkingLot.availableStorage).toBe(availableStorageOfTheFirstOne - 1);
		expect(ticket).not.toBe(null);
	});

	test('should parking car in the first one when it has higher rest rate', () => {
		firstParkingLot.getRestRate = jest.fn().mockReturnValue(0.4);
		secondParkingLot.getRestRate = jest.fn().mockReturnValue(0.3);

		const availableStorageOfTheFirstOne = firstParkingLot.availableStorage;
		const ticket = parkingBoy.parkCar(new Car());

		expect(firstParkingLot.availableStorage).toBe(availableStorageOfTheFirstOne - 1);
		expect(ticket).not.toBe(null);
	});

	test('should parking car in the second one when it has higher rest rate', () => {
		jest.spyOn(firstParkingLot, 'restRate', 'get').mockReturnValue(0.2);
		jest.spyOn(secondParkingLot, 'restRate', 'get').mockReturnValue(0.4);

		const availableStorageOfTheSecondOne = secondParkingLot.availableStorage;
		const ticket = parkingBoy.parkCar(new Car());

		expect(secondParkingLot.availableStorage).toBe(availableStorageOfTheSecondOne - 1);
		expect(ticket).not.toBe(null);
	});

	test('should throw error when has no storage', () => {
		jest.spyOn(firstParkingLot, 'availableStorage', 'get').mockReturnValue(0);
		jest.spyOn(secondParkingLot, 'availableStorage', 'get').mockReturnValue(0);

		expect(() => {
			parkingBoy.parkCar(new Car());
		}).toThrow('parkingLot has no storage');
	});

});
