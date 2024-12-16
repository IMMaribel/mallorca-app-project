// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { firestore } from "../../firebaseConfig";

// export const saveFavorite = async (uid, favorite) => {
//     try {
//         if (!uid) throw new Error("User ID is undefined.");
//         const favoritesCollection = collection(firestore, "favorites");
//         await addDoc(favoritesCollection, { uid, ...favorite });
//         console.log("Favorito guardado correctamente.");
//     } catch (error) {
//         console.error("Error al guardar favorito:", error.message);
//     }
// };

// export const loadFavorites = async (uid) => {
//     try {
//       if (!uid) throw new Error("User ID is undefined.");
//       const q = query(collection(firestore, "favorites"), where("uid", "==", uid));
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       console.error("Error al cargar favoritos:", error.message);
//       return [];
//     }
// };
  
  
