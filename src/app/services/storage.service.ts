import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: AngularFirestore) { }

  public getData(): Observable<any> {
    return this.firestore.collection('data',ref => ref.orderBy('value')).snapshotChanges();
  }

  public saveData(data: Data) {
    return this.firestore.collection('data').add(JSON.parse (JSON.stringify(data)));
  }

}
