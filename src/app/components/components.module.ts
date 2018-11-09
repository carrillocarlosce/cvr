import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFolderComponent } from './create-folder/create-folder.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InfoFolderComponent } from './info-folder/info-folder.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [CreateFolderComponent, InfoFolderComponent],
  exports: [CreateFolderComponent, InfoFolderComponent],
})
export class ComponentsModule { }
