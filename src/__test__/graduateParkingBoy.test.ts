import Car from '../car';
import GraduateParkingBoy from '../graduateParkingBoy';
import ParkingBoy from '../parkingBoy';
import ParkingLot from '../parkingLot';

describe('test graduate parking boy', () => {
	let parkingBoy: ParkingBoy;
	let firstParkingLot: ParkingLot;
	let secondParkingLot: ParkingLot;

	beforeEach(() => {
		firstParkingLot = new ParkingLot();
		secondParkingLot = new ParkingLot();
		parkingBoy = new GraduateParkingBoy([firstParkingLot, secondParkingLot]);
	});

	test('should parking car in the second one when the first one has no storage', () => {
		jest.spyOn(firstParkingLot, 'availableStorage', 'get').mockReturnValue(0);
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
