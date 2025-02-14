/**
 * @license
 * Copyright 2025 Varshil J. Patel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, View, ActivityIndicator } from "react-native";
import { getData } from "./src/utils/login";
import LoginScreen from "./src/screens/Login";
import MainTabs from "./src/components/MainTabs";

const Stack = createStackNavigator();

function App(): React.JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await getData();
            setIsLoggedIn(!!token);
        };
        checkLoginStatus();
    });

    if (isLoggedIn === null) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#000",
                }}
            >
                <ActivityIndicator size="large" color="#003fff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <StatusBar
                backgroundColor="#000"
                barStyle="light-content"
                translucent={false}
            />
            <Stack.Navigator
                initialRouteName={isLoggedIn ? "MainTabs" : "LoginScreen"}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
