import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComandasPage } from './comandas.page';

const routes: Routes = [
  {
    path: '',
    component: ComandasPage
  },
  {
    path: 'platos/:codCom',
    loadChildren: () => import('./platos/platos.module').then( m => m.PlatosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComandasPageRoutingModule {}
