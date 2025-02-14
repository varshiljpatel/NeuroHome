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

import exp from "constants";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TalkScreen: React.FC = () => {
    const [isListening, setIsListening] = React.useState<boolean>(false);
    const [temperature, setTemperature] = React.useState<number>(24);

    return (
        <View style={styles.container}>
            {/* Temperature Widget */}
            <View style={styles.tempWrapper}>
                <MaterialCommunityIcons
                    name="cloud"
                    size={48}
                    color="#003fff"
                />
                <Text style={styles.tempText}>{24}°C</Text>
            </View>

            {/* Talk Widget */}
            <TouchableHighlight
                underlayColor={"rgba(0,63,255,0.5)"}
                style={[styles.recordButton]}
                onPressIn={() => setIsListening(true)}
                onPressOut={() => setIsListening(false)}
            >
                <>
                    <View style={styles.recordButtonWrapper}>
                        <MaterialCommunityIcons
                            name={
                                isListening
                                    ? "ear-hearing"
                                    : "microphone-outline"
                            }
                            size={48}
                            color="white"
                        />
                    </View>
                    <Text style={styles.currentStateText}>
                        {isListening ? "Listening" : "Tap to speak"}
                    </Text>
                </>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    tempWrapper: {
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        gap: 4,
        borderRadius: 30,
        width: "100%",
        backgroundColor: "rgb(25,25,25)",
    },
    tempText: {
        color: "white",
        fontSize: 24,
        fontWeight: "medium",
    },
    container: {
        backgroundColor: "rgb(15,15,15)",
        gap: 16,
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 16,
    },
    recordButtonWrapper: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
    recordButton: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        borderRadius: 30,
        paddingBottom: 16,
        backgroundColor: "#003fff",
    },
    currentStateText: {
        color: "white",
        fontSize: 24,
        fontWeight: "medium",
    },
});

export default TalkScreen;
