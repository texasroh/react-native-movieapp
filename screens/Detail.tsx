import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

export type RootStackParamList = {
  Detail: { originalTitle: string };
};

const Detail: React.FC<
  NativeStackScreenProps<RootStackParamList, "Detail">
> = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}) => {
  useEffect(() => {
    setOptions({
      title: originalTitle,
    });
  }, []);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};

export default Detail;
