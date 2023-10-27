import { db } from './firebaseConfig';
import { collection, query, onSnapshot, addDoc, getFirestore, serverTimestamp, deleteDoc, doc } from "firebase/firestore";

export async function recordPosts(textOfPost) {
    const docRef = await addDoc(collection(db, "posts"), {
        text: textOfPost,
        date: serverTimestamp(),
        // id  : doc.id
    });
    console.log("Document written with ID: ", docRef.id);
};

export function readPosts(callback) {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = []
        querySnapshot.forEach((doc) => {
            const obj = {
                textOfPost: doc.data().text,
                dateOfPost: new Date(doc.data().date.seconds*1000),
                id: doc.id
            }
            posts.push(obj);
        });
         console.log("Posts: ", posts.join(", "));
        callback(posts);
        //teste
    });
};


export async function deletePosts(textOfPost) {
    const docRef = await deleteDoc(collection(db, "posts"), {
        text: textOfPost,
        date: serverTimestamp(),
        // id: doc.id
    });

} 
