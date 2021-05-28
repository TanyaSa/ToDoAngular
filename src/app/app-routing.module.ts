import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { pathMatcher } from './modules/auth/auth-routing.module';
import { Role } from './modules/auth/role';


const appRoutes: Routes = [

    {
        matcher: pathMatcher,
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: '',
        loadChildren: () => import('./modules/checklist/checklist.module').then(m => m.ChecklistModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.User] }
    },
    {
        path: '**',
        redirectTo: ''
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
