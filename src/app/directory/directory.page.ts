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
  public aside: any = {};
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
                    parentId: folderId,
                    id: folder.payload.doc.id,
                    ...folder.payload.doc.data()
                  }
                })
              })
            )
          this.folder = this.afs.doc(`user_folders/${folderId}`).valueChanges()
        }),
        map(params => {
          return {
            folderId: params.get('folderId')
          }
        })
      )
  }

  selectFile(file) {
    this.selectedFile = file;
    this.aside.show = true;
    this.aside.component = 'file_details';
    this.aside.data = {
      title: file,
      custom_data: file
    };

    console.log(this.aside)
  }

  folderInfo(folder) {
    this.aside = {
      show: true,
      component: 'folder_info',
      folder
    }
  }

  newFolder(folder) {
    this.aside.show = true;
    this.aside.component = 'folder_form';
    this.aside.data = {
      title: 'Nueva Carpeta',
      parentFolder: folder
    };
  }

}