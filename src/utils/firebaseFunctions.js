import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

// Guardar nuevo Item
export const saveItem = async(data) => {
    await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
        merge: true,
    });
};

//Mostrar todos los Items
export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};

// Guardar nuevo Item
export const saverReserve = async(data) => {
    await setDoc(doc(firestore, "reserveItems", `${Date.now()}`), data, {
        merge: true,
    });
};

//Mostrar todos los Items
export const getAllReserveItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "reserveItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};