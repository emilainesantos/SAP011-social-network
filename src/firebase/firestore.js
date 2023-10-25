import { db } from './firebaseConfig';
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { getFirestore, serverTimestamp } from "firebase/firestore";

export function readPosts(callback) {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = []
        querySnapshot.forEach((doc) => {
            const obj = {
                textOfPost: doc.data().text,
                dateOfPost: new Date(doc.data().date.seconds*1000)
            }
            posts.push(obj);
        });
         console.log("Posts: ", posts.join(", "));
        callback(posts);
        //teste
    });
};


export async function recordPosts(textOfPost) {
    const docRef = await addDoc(collection(db, "posts"), {
        text: textOfPost,
        id: "",
        date: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);

} 
