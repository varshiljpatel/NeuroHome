import { initializeApp } from "@react-native-firebase/app";
import { getDatabase } from "@react-native-firebase/database";
import { firebaseConfig } from "./firebaseOptions";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
