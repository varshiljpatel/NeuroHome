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

// Add a device details in async storage

import { Alert } from "react-native";
import { ToggleCardProps } from "../components/ToggleCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IAddDevice {
    newDeviceName: string;
}

const addToStore = async (param: ToggleCardProps) => {
    try {
        AsyncStorage.setItem(
            "devices",
            JSON.stringify([
                ...JSON.parse((await AsyncStorage.getItem("devices")) || "[]"),
                {
                    deviceID: param.deviceID,
                    iconName: param.iconName,
                    inactiveIconName: param.inactiveIconName,
                    title: param.title,
                },
            ])
        );
        return true;
    } catch (error: any) {
        Alert.alert("Failed!", "Failed to add device" + " " + param.title);
        return false;
    }
};

const removeFromStore = async (deviceID: string) => {
    try {
        const storedDevices = JSON.parse(
            (await AsyncStorage.getItem("devices")) || "[]"
        );
        const updatedDevices = storedDevices.filter(
            (device: ToggleCardProps) => device.deviceID !== deviceID
        );
        await AsyncStorage.setItem("devices", JSON.stringify(updatedDevices));
        return true;
    } catch (error: any) {
        Alert.alert("Failed!", "Failed to remove device" + " " + deviceID);
        return false;
    }
};

export const getDevices = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("devices");
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        throw new Error("Failed to get devices" + " " + e);
    }
};

export const addDevice = async ({ newDeviceName }: IAddDevice) => {
    if (newDeviceName.trim() === "") return false;

    // Check if the device already exists
    const deviceExists = async () => {
        const storedDevices = JSON.parse(
            (await AsyncStorage.getItem("devices")) || "[]"
        );
        const isDevice: boolean = storedDevices.some(
            (device: ToggleCardProps) => device.title === newDeviceName
        );
        return isDevice;
    };

    if (await deviceExists()) {
        Alert.alert(
            "Device Already Exists",
            `A device with the name "${newDeviceName}" is already exists.`,
            [{ text: "OK" }],
            { cancelable: true }
        );
        return false;
    }

    const validIcons: Record<string, string> = {
        tv: "television-classic",
        light: "lightbulb-variant",
        fan: "fan",
        cube: "cube-outline",
    };

    const iconName =
        validIcons[newDeviceName.toLowerCase().split(" ")[0]] || "cube-outline";

    const newDevice: ToggleCardProps = {
        deviceID: `${newDeviceName.toLowerCase()}:state`,
        iconName: iconName,
        inactiveIconName: iconName,
        title: newDeviceName,
    };

    return await addToStore(newDevice);
};

export const removeDevice = async (deviceID: string) => {
    return await removeFromStore(deviceID);
};
