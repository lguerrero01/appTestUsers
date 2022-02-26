import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableComponent } from './shared/components/datatable/datatable.component';
/////////////////
// Components
////////////////
const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('src/app/components/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'table',
    component: DatatableComponent,
  },
  {
    path: '**',
    redirectTo: '/user',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
