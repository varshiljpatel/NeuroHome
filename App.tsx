import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SettingsScreen from "./src/screens/Setting";
import HomeScreen from "./src/screens/Home";
import { StatusBar, View, ActivityIndicator } from "react-native";
import Logo from "./src/components/Logo";
import { getData } from "./src/utils/login";
import LoginScreen from "./src/screens/Login";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = route.name === "Home" ? "home" : "cog";
                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
                tabBarActiveTintColor: "#0040ff",
                headerShown: true,
                headerStyle: { backgroundColor: "rgb(15,15,15)" },
                headerTitle: () => <Logo />,
                headerTintColor: "#fff",
                tabBarInactiveTintColor: "#fff",
                tabBarIconStyle: {
                    height: "100%",
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "rgb(25,25,25)",
                    borderTopWidth: 0,
                    height: 60,
                    paddingBottom: 5,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

function App(): React.JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await getData();
            setIsLoggedIn(!!token);
        };
        checkLoginStatus();
    }, []);

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
                <ActivityIndicator size="large" color="#fff" />
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
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoggedIn ? (
                    <Stack.Screen name="MainTabs" component={MainTabs} />
                ) : (
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
