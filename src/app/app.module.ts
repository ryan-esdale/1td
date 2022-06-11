import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SceneComponent } from './scene/scene.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TruncPipe } from './objects/util/trunc.pipe';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertComponent } from './alerts/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SceneComponent,
    MenuComponent,
    NavMenuComponent,
    TruncPipe,
    AlertsComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
