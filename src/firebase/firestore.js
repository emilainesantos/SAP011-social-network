import { db } from './firebaseConfig';
import { collection, query, onSnapshot } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";


// function lerPosts(){
//     const q = query(collection(db, "posts"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const posts = [];
//   querySnapshot.forEach((doc) => {
//       posts.push(doc.data().text);
//   });
//   console.log("Current cities in CA: ", cities.join(", "));
// });

// }






export function readPosts(callback) {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = []
        querySnapshot.forEach((doc) => {
            const obj = {
                textOfPost: doc.data().text,
                dateOfPost: doc.data().date
            }
            posts.push(obj);
        });
         console.log("Posts: ", posts.join(", "));
        callback(posts);
        //teste
    });
};

// export function recordPosts() {
//     const docRef = await addDoc(collection(db, "posts"), {
//         text: "Tokyo",
//         id: "",
//         date: "Japan"
//     });
//     console.log("Document written with ID: ", docRef.id);

// } 
