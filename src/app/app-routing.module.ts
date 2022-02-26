import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: '**',
    redirectTo: '/user',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
