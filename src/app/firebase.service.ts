import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Nutzer} from './Nutzer';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {
  }

  createUser(nutzer: Nutzer): Promise<any> {
    return this.firestore.collection('/Nutzer').add({...nutzer})
  }

  getUsers(): AngularFirestoreCollection<Nutzer> {
    return this.firestore.collection<Nutzer>('/Nutzer');
  }
}
