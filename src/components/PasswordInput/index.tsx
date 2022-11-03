import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import {
  Container,
  InputText,
  IconContainer,
  ChangePasswordVisibilityButton,
} from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export const PasswordInput = ({ iconName, value, ...rest }: Props) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const handleIsFocused = () => {
    setIsFocused(true);
  };

  const handleIsFilled = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  const handlePasswordVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        isFocused={isFocused}
        onFocus={handleIsFocused}
        onBlur={handleIsFilled}
        secureTextEntry={isVisible}
        autoCorrect={false}
        {...rest}
      />
      <ChangePasswordVisibilityButton onPress={handlePasswordVisibility}>
        <Feather
          name={isVisible ? "eye" : "eye-off"}
          size={24}
          color={theme.colors.text_detail}
        />
      </ChangePasswordVisibilityButton>
    </Container>
  );
};
