import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MaterialModule } from '../material/material.module';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    FooterComponent,
    TruncatePipe,
    TopBarComponent
  ],
  exports: [
    FooterComponent,
    TruncatePipe,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
