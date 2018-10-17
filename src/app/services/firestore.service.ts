import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  getDocument(path): AngularFirestoreDocument {
    console.log(`Reading from "${path}"`);
    return this.afs.doc(path);
  }

  public getCollection(path): AngularFirestoreCollection {
    return this.afs.collection(path);
  }
}
