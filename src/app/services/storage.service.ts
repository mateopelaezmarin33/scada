import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
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

  public saveData(data: Data): Promise<any> {
    return this.firestore.collection('data').add(JSON.parse (JSON.stringify(data)));
  }

}
