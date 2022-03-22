import { CarDTO } from '../../dtos/CarDTO';

export type RootsStackParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: CarDTO; };
  Schedule: { car: CarDTO; };
  ScheduleDetails: { 
    car: CarDTO; 
    dates: string[];
  };
  ScheduleComplete: { car: CarDTO; };
  MyCars: undefined
}