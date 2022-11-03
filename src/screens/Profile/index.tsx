import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";

import { useAuth } from "../../hooks/auth";
import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  ContentHeader,
  Option,
  OptionTitle,
  Section,
} from "./styles";

export const Profile = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const { user } = useAuth();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {};

  const handleOptionChange = (selectedOption: "dataEdit" | "passwordEdit") => {
    setOption(selectedOption);
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleLogout}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo
                source={{
                  uri: "https://avatars.githubusercontent.com/u/10424568?v=4",
                }}
              />
              <PhotoButton onPress={() => {}}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <ContentHeader>
              <Option
                onPress={() => handleOptionChange("dataEdit")}
                active={option === "dataEdit"}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                onPress={() => handleOptionChange("passwordEdit")}
                active={option === "passwordEdit"}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </ContentHeader>
            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  autoCorrect={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
