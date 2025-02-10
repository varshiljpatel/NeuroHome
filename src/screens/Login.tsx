import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import { storeData } from "../utils/login";

const LoginScreen: React.FC<any> = ({ navigation }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState<string | null>(null); // Track focused input

    const handleLogin = async () => {
        if (name === "admin" && password === "password") {
            await storeData({ name, password });
            try {
                navigation.replace("MainTabs");
            } catch (error: any) {
                Alert.alert("Error", error.message);
            }
        } else {
            Alert.alert("Login Failed", "Invalid credentials");
        }
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "rgb(15,15,15)", padding: 16 }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Details?</Text>
                <Text style={styles.text}>
                    Enter your details for setup. This is a one-time process,
                    please fill in the details carefully.
                </Text>
                <TextInput
                    placeholder="Name"
                    style={[
                        styles.input,
                        {
                            borderColor:
                                focusedInput === "name" ? "#fff" : "#404040",
                        },
                    ]}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#404040"
                    onFocus={() => setFocusedInput("name")}
                    onBlur={() => setFocusedInput(null)}
                />
                <TextInput
                    placeholder="Password"
                    style={[
                        styles.input,
                        {
                            borderColor:
                                focusedInput === "password"
                                    ? "#fff"
                                    : "#404040",
                        },
                    ]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#404040"
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity
                    onPress={name && password ? handleLogin : undefined}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                name && password ? "#fff" : "#404040",
                        },
                    ]}
                    disabled={!name || !password}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            { color: name && password ? "#000" : "#888" },
                        ]}
                    >
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        minHeight: "100%",
        justifyContent: "center",
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "600",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        opacity: 0.5,
        fontWeight: "400",
        marginBottom: 24,
    },
    input: {
        width: "100%",
        height: 60,
        borderWidth: 1,
        borderRadius: 0,
        color: "#fff",
        paddingHorizontal: 16,
    },
    button: {
        width: "100%",
        height: 60,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
        marginTop: 24,
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default LoginScreen;
