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

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen: React.FC<any> = ({ navigation }) => {
    const handleLogout = async () => {
        await AsyncStorage.removeItem("userToken");
        navigation.replace("LoginScreen");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    text: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "medium",
        marginBottom: 20,
    },
    button: {
        width: "100%",
        height: 60,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default SettingsScreen;
