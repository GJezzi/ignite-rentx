import React, { useRef, useState } from 'react';
import { ViewToken } from 'react-native';

import { 
  Container, 
  ImageIndexes, 
  ImageIndex, 
  CarImageWrapper, 
  CarImage, 
  CarImagesList 
} from'./styles';

interface Props {
    imagesUrl: string[];
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
            imagesUrl.map((_, index) => (
              <ImageIndex active={index === imageIndex} key={String(index)} />
            ))
          }
        </ImageIndexes>
          <CarImagesList
            data={imagesUrl}
            keyExtractor={item => String(item)}
            renderItem={({ item }) => (
              <CarImageWrapper>
                <CarImage source={{ uri: item }} resizeMode='contain'/>
              </CarImageWrapper>
            )}
            onViewableItemsChanged={indexChanged.current}
            showsHorizontalScrollIndicator={false}
            horizontal
          /> 
    </Container>
  );
}