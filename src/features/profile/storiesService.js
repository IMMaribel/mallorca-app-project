// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { firestore } from "../../firebaseConfig";

// export const saveStory = async (uid, storyData) => {
//   try {
//     const storiesCollection = collection(firestore, "stories");
//     await addDoc(storiesCollection, { uid, ...storyData });
//     console.log("Historia guardada correctamente.");
//   } catch (error) {
//     console.error("Error al guardar historia:", error.message);
//   }
// };

// export const loadStories = async (uid) => {
//     if (!uid) {
//       console.error("El uid es inválido o no está definido.");
//       return [];
//     }
//     try {
//       const storiesCollection = collection(firestore, "stories");
//       const q = query(storiesCollection, where("uid", "==", uid));
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       console.error("Error al cargar stories:", error.message);
//       return [];
//     }
//   };
  
