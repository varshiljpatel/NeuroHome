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

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Logo from "./Logo";
import SettingsScreen from "../screens/Setting";
import HomeScreen from "../screens/Home";
import exp from "constants";

const MainTabs: React.FC = () => {
    const Tab = createBottomTabNavigator();

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
                headerStyle: {
                    backgroundColor: "rgb(15,15,15)",
                },
                headerTitleAlign: "center",
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
};

export default MainTabs;
