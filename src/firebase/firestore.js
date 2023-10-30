import { db } from './firebaseConfig';
import { 
    collection,
    query,
    onSnapshot,
    addDoc,
    orderBy,
    doc,
    updateDoc,
 } from "firebase/firestore";
import { getFirestore, serverTimestamp } from "firebase/firestore";

export function readPosts(callback) {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = []
        querySnapshot.forEach((document) => {
            const obj = {
                textOfPost: document.data().text,
                dateOfPost: new Date(document.data().date.seconds*1000),
                id: document.id,
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

export function atualizarPost(postid, novoTexto){
    const postRef = doc(db, "posts", postid);
    
    return updateDoc(postRef, {
        text: novoTexto,
    });

}
