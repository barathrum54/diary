import { db } from "@/services/firebase.service";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useAuthStore } from "@/store/auth.store";
const authStore = useAuthStore();

class CrudService {
  async getToday() {
    const uid = authStore.getUser.uid;
    const logsref = collection(db, "logs");
    const q = query(logsref, where("userid", "==", uid));
    const querySnapshot = await getDocs(q);
    let res;
    querySnapshot.forEach((doc) => {
      let date = doc.data().datetime;
      let docsDate = new Date(date);
      const _today = Date.now();
      const today = new Date(_today);
      if (
        docsDate.getDate() == today.getDate() &&
        docsDate.getMonth() == today.getMonth() &&
        docsDate.getFullYear() == today.getFullYear()
      ) {
        res = doc.data();
      }
    });
    return res;
  }
  async getAll(){
    const uid = authStore.getUser.uid;
    const logsref = collection(db, "logs");
    const q = query(logsref, where("userid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  async create(item) {
    item.datetime = Date.now();
    const docRef = await addDoc(collection(db, "logs"), item);
    console.log("Document written with ID: ", docRef.id);
  }
  update(key, value) {
    return db.child(key).update(value);
  }
  delete(key) {
    return db.child(key).remove();
  }
  deleteAll() {
    return db.remove();
  }
}
export default new CrudService();
