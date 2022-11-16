import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styles";

export default function App() {
  const isDark = useColorScheme() === "dark";
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
