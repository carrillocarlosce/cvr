import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent implements OnInit {
  @Input() data: any;
  constructor(
    public afs: AngularFirestore,
    public auth: AuthService
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  async handleForm(folderForm: NgForm) {
    let folderData = {...folderForm.value, parent: this.data.data.parentFolder.folderId};
    let user = await this.auth.getUser();
    this.afs.collection('user_folders').add({...folderData, user: user.uid});
    folderForm.reset();
  }

}
