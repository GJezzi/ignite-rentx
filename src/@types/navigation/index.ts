import { CarDTO } from '../../dtos/CarDTO';

export type RootsStackParamList = {
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