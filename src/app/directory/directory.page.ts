import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  public data: Observable<any>;
  public children:Observable<any[]>;
  public folder: Observable<any>;
  public selectedFile: any;
  constructor(
    public afs: AngularFirestore,
    public auth: AuthService,
    public route: ActivatedRoute
    ) { }

  async ngOnInit() {
    let user = await this.auth.getUser();
    this.data = this.route.paramMap
      .pipe(
        tap(params => {
          let folderId = params.get('folderId');
          this.children = this.afs
            .collection('user_folders', x => x.where('user', '==', user.uid).where('parent', '==', folderId))
            .snapshotChanges()      
            .pipe(
              map(folders => {
                return folders.map(folder => {
                  return {
                    id: folder.payload.doc.id,
                    ...folder.payload.doc.data()
                  }
                })
              })
            )
          this.folder = this.afs.doc(`user_folders/${folderId}`).valueChanges()
        })
      )
  }

  selectFile(file) {
    console.log(file)
    this.selectedFile = file;
  }

}