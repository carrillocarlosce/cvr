import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-folder',
  templateUrl: './info-folder.component.html',
  styleUrls: ['./info-folder.component.scss']
})
export class InfoFolderComponent implements OnInit {
  @Input() folder: any;
  public folderDetails: Observable<any>;
  constructor(
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.folderDetails = this.afs.doc(`user_folders/${this.folder.folderId}`).valueChanges();
    this.folderDetails.subscribe(x => console.log(x));
  }

}
