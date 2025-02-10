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
} from "react-native";
import ToggleCard, { ToggleCardProps } from "../components/ToggleCard"; // Import ToggleCard
import { Text } from "react-native-gesture-handler";
import { getData, storeData } from "../utils/usage";

const availableDevices: ToggleCardProps[] = [
    {
        deviceID: "light:state",
        iconName: "lightbulb-variant",
        inactiveIconName: "lightbulb-variant-outline",
        title: "Light",
    },
    {
        deviceID: "fan:state",
        iconName: "fan",
        inactiveIconName: "fan-off",
        title: "Fan",
    },
    {
        deviceID: "tv:state",
        iconName: "television-classic",
        inactiveIconName: "television-classic-off",
        title: "TV",
    },
];

function HomeScreen() {
    const [isUsageCardViewed, setIsUsageCardViewed] = React.useState<"0" | "1">(
        "0"
    );

    React.useEffect(() => {
        (async () => {
            const result = await getData();
            if (result === "1") setIsUsageCardViewed("1");
        })();
    }, []);

    return (
        <ScrollView style={[styles.container, { backgroundColor: "#000" }]}>
            <View style={styles.contentContainer}>
                {isUsageCardViewed !== "1" && (
                    <View style={[styles.textWrapper]}>
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 24,
                                fontWeight: "medium",
                            }}
                        >
                            Available Devices
                        </Text>
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 16,
                                opacity: 0.5,
                                fontWeight: "normal",
                            }}
                        >
                            Below are all the available devices near you. Just
                            tap on it to toggle.
                        </Text>
                        <TouchableWithoutFeedback
                            onPress={async () => {
                                await storeData({
                                    viewed: "1",
                                });
                            }}
                        >
                            <Text style={[styles.textGotit]}>Got it</Text>
                        </TouchableWithoutFeedback>
                    </View>
                )}
                {availableDevices.map((props, index) => (
                    <ToggleCard key={index} {...props} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textGotit: {
        color: "#0040ff",
        fontSize: 16,
        fontWeight: "medium",
        marginTop: 16,
    },
    textWrapper: {
        padding: 24,
        paddingVertical: 32,
        flex: 1,
        borderRadius: 30,
        gap: 8,
        marginBottom: 24,
        backgroundColor: "rgb(25,25,25)",
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: "rgb(15,15,15)",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 16,
    },
});

export default HomeScreen;
