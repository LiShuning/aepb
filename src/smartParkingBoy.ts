import ParkingBoy from './parkingBoy';
import ParkingLot from './parkingLot';
import ParkingLotSelectMethod from './parkingLotSelectMethod';

export default class SmartParkingBoy extends ParkingBoy{
	protected selectParkingLot(): ParkingLot {
		return ParkingLotSelectMethod.selectByStorage(this.parkingLots);
	}

}
