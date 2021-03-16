import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule) },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy',
      preloadingStrategy: PreloadAllModules
    })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
