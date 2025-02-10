import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StoreDataType {
    viewed: "0" | "1";
}

export const storeData = async (value: StoreDataType) => {
    try {
        await AsyncStorage.setItem("usage_viewed", value.viewed);
    } catch (e) {
        throw new Error("Failed to store data" + " " + e);
    }
};

export const getData = async () => {
    try {
        return (await AsyncStorage.getItem("usage_viewed")) || null;
    } catch (e) {
        throw new Error("Failed to get data" + " " + e);
    }
};
