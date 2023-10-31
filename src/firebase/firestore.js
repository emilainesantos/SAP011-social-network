import { db } from './firebaseConfig';
import { collection, query, onSnapshot, addDoc, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getFirestore, serverTimestamp } from "firebase/firestore";

export function readPosts(callback) {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = []
        querySnapshot.forEach((document) => {
            let dateOfPost = document.data().date;
            if (dateOfPost === null) {
                dateOfPost = serverTimestamp();
            }
            const obj = {
                textOfPost: document.data().text,
                dateOfPost: new Date(dateOfPost.seconds * 1000),
                id: document.id
            }
            posts.push(obj);
        });

        callback(posts);

    });
};

export async function recordPosts(textOfPost) {
    const docRef = await addDoc(collection(db, "posts"), {
        text: textOfPost,
        id: "",
        date: serverTimestamp(),
    });

}

export function atualizarPosts(postid, novoTexto) {
    const postRef = doc(db, 'posts', postid);
    return updateDoc(postRef, { 
        text: novoTexto, 
    });
}

export async function deletePosts(postid) {
    await deleteDoc(doc(db, "posts", postid));
}

