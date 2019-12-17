import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../firebase.service';
import {Nutzer} from '../Nutzer';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})

export class NewUserComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup =  new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Vorname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Qualifikation: new FormControl('', [
        Validators.required,
        Validators.maxLength(3)
      ]),
    });
  }

  onSubmit() {
    let nutzer;
    nutzer = new Nutzer();
    nutzer.vorname = this.formGroup.controls['Vorname'].value;
    nutzer.nachname = this.formGroup.controls['Name'].value
    nutzer.qualifikation = this.formGroup.controls['Qualifikation'].value

    this.firebaseService.createUser(nutzer).then(r => this.formGroup.reset());

  }

}
