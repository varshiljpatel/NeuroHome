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
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal,
} from "react-native";
import ToggleCard, { ToggleCardProps } from "../components/ToggleCard";
import { Text } from "react-native-gesture-handler";
import { getData, storeData } from "../utils/usage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Logo from "../components/Logo";
import { addDevice, getDevices, removeDevice } from "../utils/devices";
import { get } from "node:https";

function HomeScreen() {
    const [isUsageCardViewed, setIsUsageCardViewed] = React.useState<"0" | "1">(
        "0"
    );
    const [devices, setDevices] = React.useState<ToggleCardProps[]>([]);
    const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
    const [newDeviceName, setNewDeviceName] = React.useState<string>("");

    React.useEffect(() => {
        (async () => {
            const devices = await getDevices();
            setDevices(devices);
        })();
    });

    React.useEffect(() => {
        (async () => {
            const result = await getData();
            if (result === "1") setIsUsageCardViewed("1");
        })();
    }, [isUsageCardViewed]);

    return (
        <View style={styles.container}>
            {devices.length === 0 && (
                <View
                    style={{
                        height: "100%",
                        justifyContent: "flex-start",
                        padding: 24,
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "medium",
                            color: "#fff",
                            marginBottom: 8,
                        }}
                    >
                        No Devices
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "normal",
                            color: "#fff",
                            opacity: 0.5,
                            marginBottom: 32,
                        }}
                    >
                        Tap Add Device to add a new device.
                    </Text>
                    <TouchableOpacity
                        style={{
                            height: 48,
                            borderRadius: 999,
                            paddingHorizontal: 32,
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "#0040ff",
                            borderWidth: 1,
                        }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "medium",
                                color: "#0040ff",
                            }}
                        >
                            Add Device
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            {devices.length > 0 && (
                <ScrollView style={{ flex: 1, backgroundColor: "#000" }}>
                    {/* Main Content */}
                    <View style={styles.contentContainer}>
                        {isUsageCardViewed !== "1" && (
                            <View style={styles.textWrapper}>
                                <Text style={styles.title}>
                                    Available Devices
                                </Text>
                                <Text style={styles.description}>
                                    Below are all the available devices near
                                    you. Just tap on it to toggle.
                                </Text>
                                <TouchableWithoutFeedback
                                    onPress={async () => {
                                        await storeData({ viewed: "1" });
                                        setIsUsageCardViewed("1");
                                    }}
                                >
                                    <Text style={styles.textGotit}>Got it</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                        {devices.map((props, index) => (
                            <ToggleCard
                                key={index}
                                {...props}
                                onRemove={() => removeDevice(props.deviceID)}
                            />
                        ))}
                    </View>
                </ScrollView>
            )}

            {/* Floating Button (Opens Modal) */}
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.floatingButton}
            >
                <MaterialCommunityIcons name="plus" size={24} color="#fff" />
                <Text style={styles.floatingButtonText}>Add device</Text>
            </TouchableOpacity>

            {/* Modal for Adding a Device */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Logo />
                        <Text style={styles.modalTitle}>Add New Device</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter device name"
                            placeholderTextColor="#999"
                            value={newDeviceName}
                            onChangeText={setNewDeviceName}
                        />
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 16,
                                opacity: 0.5,
                                fontWeight: "400",
                                marginBottom: 64,
                            }}
                        >
                            Enter the name of the new device in the above
                            visible input box.
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.cancelButton}
                            >
                                <Text style={styles.cancelButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    addDevice({
                                        newDeviceName,
                                    }).then((value: boolean) => {
                                        setModalVisible(!value);
                                        if (value) setNewDeviceName("");
                                    })
                                }
                                style={styles.addButton}
                            >
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(15, 15, 15)",
    },
    floatingButton: {
        position: "absolute",
        bottom: 16,
        right: 16,
        height: 60,
        borderRadius: 999,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0040ff",
        paddingHorizontal: 24,
    },
    floatingButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 8,
    },
    textGotit: {
        color: "#0040ff",
        fontSize: 16,
        fontWeight: "500",
        marginTop: 16,
    },
    textWrapper: {
        padding: 24,
        paddingVertical: 32,
        borderRadius: 30,
        gap: 8,
        marginBottom: 16,
        backgroundColor: "rgb(25,25,25)",
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        paddingTop: 0,
        backgroundColor: "rgb(15,15,15)",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 16,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "500",
    },
    description: {
        color: "#fff",
        fontSize: 16,
        opacity: 0.5,
        fontWeight: "400",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#222",
        padding: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "500",
        marginTop: 32,
        marginBottom: 24,
    },
    input: {
        backgroundColor: "transparent",
        borderColor: "#fff",
        borderWidth: 1,
        color: "#fff",
        height: 60,
        padding: 16,
        borderRadius: 0,
        fontSize: 16,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelButton: {
        marginRight: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        height: 60,
    },
    cancelButtonText: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 16,
    },
    addButton: {
        backgroundColor: "#0040ff",
        height: 60,
        paddingHorizontal: 64,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default HomeScreen;
