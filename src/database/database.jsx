import { ref, get, set } from "firebase/database";
import { database } from "./firebase";

async function Get(table = "", id = "") {
  const dbRef = ref(database, `/${table}/${id}`);
  return get(dbRef)
    .then((snapshot) => {
      return snapshot.val();
    })
    .catch((error) => {
      console.error(error);
    });
}

async function Add(table, id, data) {
  const dbRef = ref(database, `${table}/${id}`);
  return set(dbRef, data);
}

export { Get, Add };
