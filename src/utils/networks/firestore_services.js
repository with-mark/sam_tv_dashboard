import firebase from './firebaseConfig'

export const fetchFireStoreItems = async (collectionName)=>{
    const ref = firebase.firestore().collection(collectionName)
    let items = []
   await ref.onSnapshot(querySnapshot=>{
        querySnapshot.forEach(doc=>{
            items.push(doc.data())
        })
        
    })
    return items

}