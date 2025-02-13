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

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StoreDataType {
    name: string;
    password: string;
}

const LOGIN_KEYNAME = "login";

export const storeData = async (value: StoreDataType) => {
    try {
        await AsyncStorage.setItem(
            LOGIN_KEYNAME,
            JSON.stringify(value, null, 2)
        );
    } catch (e) {
        throw new Error("Failed to store data" + " " + e);
    }
};

export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(LOGIN_KEYNAME);
        return jsonValue != null
            ? (JSON.parse(jsonValue) as StoreDataType)
            : null;
    } catch (e) {
        throw new Error("Failed to get data" + " " + e);
    }
};

export const removeData = async () => {
    await AsyncStorage.removeItem(LOGIN_KEYNAME);
};
