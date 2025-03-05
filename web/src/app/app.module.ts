import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SubdivisionDataDisplayComponent } from './subdivision-data-display/subdivision-data-display.component';
import { SubdivisonService } from './services/subdivison.service';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from './pipes/trancate.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';


import { FilterComponent } from './filter/filter.component';
import { GroupBySubdivisionComponent } from './group-by-subdivision/group-by-subdivision.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DialogService } from './services/dialog.service';
import { MydialogComponent } from './mydialog/mydialog.component';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubdivisionDataDisplayComponent,
    FilterComponent,
    GroupBySubdivisionComponent,
    CartComponent,
    HomeComponent,
    TruncatePipe,
    LoginComponent,
    MydialogComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    // FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    // MatInputModule,
    MatButtonModule,
    // MatFormFieldModule,
    MatCardModule,
    // NgOptimizedImage


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SubdivisonService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
