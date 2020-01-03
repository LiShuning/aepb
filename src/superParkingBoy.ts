import ParkingBoy from './parkingBoy';
import ParkingLot from './parkingLot';
import ParkingLotSelectMethod from './parkingLotSelectMethod';

export default class SuperParkingBoy extends ParkingBoy {
	protected selectParkingLot(): ParkingLot {
		return ParkingLotSelectMethod.selectByRestRate(this.parkingLots);
	}
}
