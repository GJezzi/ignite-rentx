import React, { useRef, useState } from 'react';
import { ViewToken } from 'react-native';

import { Bullet } from '../Bullet';

import { 
  Container, 
  ImageIndexes, 
  CarImageWrapper, 
  CarImage, 
  CarImagesList 
} from'./styles';

interface Props {
    imagesUrl: {
      id: string;
      photo: string;
    }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export const ImageSlider = ({ imagesUrl }: Props) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
        <ImageIndexes>
          {
            imagesUrl.map((item, index) => (
              <Bullet active={index === imageIndex} key={String(item.id)} />
            ))
          }
        </ImageIndexes>
          <CarImagesList
            data={imagesUrl}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CarImageWrapper>
                <CarImage source={{ uri: item.photo }} resizeMode='contain'/>
              </CarImageWrapper>
            )}
            onViewableItemsChanged={indexChanged.current}
            showsHorizontalScrollIndicator={false}
            horizontal
          /> 
    </Container>
  );
}