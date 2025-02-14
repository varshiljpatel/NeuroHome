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

import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ref, onValue, set } from "@react-native-firebase/database";
import { database } from "../lib/firebaseConfig";

export interface ToggleCardProps {
    deviceID: string;
    iconName: string;
    inactiveIconName?: string;
    title: string;
    onRemove?: () => void;
}

const ToggleCard: React.FC<ToggleCardProps> = ({
    iconName,
    deviceID,
    title,
    onRemove,
    inactiveIconName,
}) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!database) return;
        const deviceRef = ref(database, `state/${deviceID.toLowerCase()}`);
        onValue(deviceRef, (snapshot) => {
            if (snapshot.exists()) {
                setIsActive(snapshot.val());
            }
        });
    }, [title]);

    const handleClick = () => {
        const newState = !isActive;
        setIsActive(newState);
        set(ref(database, `state/${deviceID.toLowerCase()}`), newState);
    };

    const confirmRemove = () => {
        Alert.alert(
            "Remove Device",
            `Are you sure you want to remove ${title}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: onRemove,
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <TouchableOpacity
            style={[
                styles.toggleBG,
                {
                    borderColor: isActive ? "#003fff" : "#404040",
                    backgroundColor: isActive ? "rgb(25,25,25)" : "transparent",
                },
            ]}
            onPress={handleClick}
            activeOpacity={0.7}
        >
            {/* Remove button */}
            <TouchableOpacity
                onPress={confirmRemove}
                style={styles.removeButton}
            >
                <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color="rgba(255,255,255,0.25)"
                />
            </TouchableOpacity>

            {/* Main content */}
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name={isActive ? iconName : inactiveIconName || iconName}
                    size={60}
                    color={isActive ? "#fff" : "#404040"}
                />
            </View>
            {title && (
                <Text
                    style={[
                        styles.title,
                        { color: isActive ? "#fff" : "#404040" },
                    ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    removeButton: {
        position: "absolute",
        right: 8,
        top: 8,
        padding: 8,
        borderRadius: 999,
    },
    toggleBG: {
        width: "100%",
        minHeight: 200,
        borderWidth: 2,
        borderRadius: 30,
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 25,
        textTransform: "capitalize",
    },
    iconContainer: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ToggleCard;
