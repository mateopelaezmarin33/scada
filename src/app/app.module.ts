import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScadaComponent } from './components/scada/scada.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCOIDzjpLk9ZTlLocjMY85PM5P4bKfzpDU",
  authDomain: "scada-uco.firebaseapp.com",
  databaseURL: "https://scada-uco.firebaseio.com",
  projectId: "scada-uco",
  storageBucket: "scada-uco.appspot.com",
  messagingSenderId: "629938875788",
  appId: "1:629938875788:web:bef148baa6db5a200d3aa9"
};
@NgModule({
  declarations: [
    AppComponent,
    ScadaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
