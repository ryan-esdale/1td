import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SceneComponent } from './scene/scene.component';
import { MenuComponent } from './menus/game-scene/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavMenuComponent } from './menus/nav-menu/nav-menu.component';
import { TruncPipe } from './objects/util/trunc.pipe';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertComponent } from './alerts/alert/alert.component';
import { HubComponent } from './menus/hub/hub.component';
import { TechTreeComponent } from './menus/tech-tree/tech-tree.component';
import { TechTreeCanvasComponent } from './menus/tech-tree/tech-tree-canvas/tech-tree-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SceneComponent,
    MenuComponent,
    NavMenuComponent,
    TruncPipe,
    AlertsComponent,
    AlertComponent,
    HubComponent,
    TechTreeComponent,
    TechTreeCanvasComponent
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
