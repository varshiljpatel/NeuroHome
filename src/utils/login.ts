import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StoreDataType {
    name: string;
    password: string;
}

export const storeData = async (value: StoreDataType) => {
    try {
        await AsyncStorage.setItem("login", JSON.stringify(value, null, 2));
    } catch (e) {
        throw new Error("Failed to store data" + " " + e);
    }
};

export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("login");
        return jsonValue != null
            ? (JSON.parse(jsonValue) as StoreDataType)
            : null;
    } catch (e) {
        throw new Error("Failed to get data" + " " + e);
    }
};
