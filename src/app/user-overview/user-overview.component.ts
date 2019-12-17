import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import { map } from 'rxjs/operators';
import {Nutzer} from '../Nutzer';
import {DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {

  userList: Nutzer[]
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  this.getUsers()
  }

  getUsers() {

    this.firebaseService.getUsers().snapshotChanges().subscribe(action => {
      this.userList = action.map(item => {
        return {id: item.payload.doc.id, ...item.payload.doc.data()} as Nutzer;
      })
    });
  }
}
