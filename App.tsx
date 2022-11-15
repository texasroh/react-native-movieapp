import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles";

export default function App() {
    const isDark = useColorScheme() === "dark";
    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <View>
                <Text>Open up App.js to start working on your app!</Text>
                <StatusBar style="auto" />
            </View>
        </ThemeProvider>
    );
}

W;
