import SpeedSvg from '../assets/speed.svg';
import AccelSvg from '../assets/acceleration.svg';
import ForceSvg from '../assets/force.svg';
import GasSvg from '../assets/gasoline.svg';
import EnergySvg from '../assets/energy.svg'
import HybridSgv from '../assets/hybrid.svg';
import GearSvg from '../assets/exchange.svg';
import PeopleSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg'

export const getAccessoryIcon = (type: string) => {
  switch (type) {
    case 'speed':
      return SpeedSvg;
    case 'acceleration':
      return AccelSvg;
    case 'turning_diameter':
      return ForceSvg;
    case 'gasoline_motor':
      return GasSvg;
    case 'electric_motor':
      return EnergySvg;
    case 'hybrid_motor':
      return HybridSgv;
    case 'exchange':
      return GearSvg;
    case 'seats':
      return PeopleSvg;
    default:
      return CarSvg;
  }
}