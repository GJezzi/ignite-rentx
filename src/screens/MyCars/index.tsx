import React, { useEffect, useState } from 'react';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { Container } from './styles';

export const MyCars = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchCars()
  }, [])
  

  return <Container />;
}

export default MyCars;