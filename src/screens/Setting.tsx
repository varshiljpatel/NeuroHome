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
