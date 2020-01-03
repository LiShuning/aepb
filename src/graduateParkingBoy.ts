import ParkingBoy from './parkingBoy';
import ParkingLot from './parkingLot';
import ParkingLotSelectMethod from './parkingLotSelectMethod';

export default class GraduateParkingBoy extends ParkingBoy{
	protected selectParkingLot(): ParkingLot {
		return ParkingLotSelectMethod.selectByOrder(this.parkingLots);
	}

}
