import { db } from './firebaseConfig';
import { collection, query, onSnapshot } from "firebase/firestore";

export function readPosts() {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        console.log("Posts: ", posts.join(", "));
    });
};
