import ParkingLotHasNoStorageError from './errors/parkingLotHasNoStorageError';
import ParkingLot from './parkingLot';

export default {
	selectByOrder(parkingLots: ParkingLot[]): ParkingLot {
		const parkingLot =	parkingLots.find((item) => item.availableStorage > 0);
		if (!parkingLot) {
			throw new ParkingLotHasNoStorageError('parkingLot has no storage');
		}
		return parkingLot;
	},
	selectByStorage(parkingLots: ParkingLot[]) {
		const parkingLot = parkingLots.sort((first, last) =>
			last.availableStorage - first.availableStorage)[0];
		if (!parkingLot) {
			throw new ParkingLotHasNoStorageError('parkingLot has no storage');
		}
		return parkingLot;
	},
	selectByRestRate(parkingLots: ParkingLot[]) {
		const parkingLot = parkingLots.sort((first, last) =>
			last.restRate - first.restRate)[0];
		if (!parkingLot) {
			throw new ParkingLotHasNoStorageError('parkingLot has no storage');
		}
		return parkingLot;
	},
};
