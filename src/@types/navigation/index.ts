import { CarDTO } from '../../dtos/CarDTO';

export type RootsStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {
    user: {
      name: string;
      email: string;
      doc: string;
    }
  };
  Home: undefined;
  CarDetails: { car: CarDTO; };
  Schedule: { car: CarDTO; };
  ScheduleDetails: { 
    car: CarDTO; 
    dates: string[];
  };
  ConfirmationScreen: { 
    title: string;
    message: string;
    nextScreenRoute: string;
  };
  MyCars: undefined;
  Profile: undefined;
}