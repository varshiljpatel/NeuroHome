import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ref, onValue, set } from "@react-native-firebase/database";
import { database } from "../lib/firebaseConfig";

export interface ToggleCardProps {
    deviceID: string;
    iconName: string;
    inactiveIconName?: string;
    title: string;
}

const ToggleCard: React.FC<ToggleCardProps> = ({
    iconName,
    deviceID,
    title,
    inactiveIconName,
}) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const deviceRef = ref(database, `devices/${title.toLowerCase()}`);
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

    return (
        <TouchableOpacity
            style={[
                styles.toggleBG,
                {
                    borderColor: isActive ? "#0040ff" : "#404040",
                    backgroundColor: isActive ? "rgb(25,25,25)" : "transparent",
                },
            ]}
            onPress={handleClick}
            activeOpacity={0.7}
        >
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
