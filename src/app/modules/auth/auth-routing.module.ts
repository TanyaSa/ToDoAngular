import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlSegment, UrlSegmentGroup, UrlMatchResult } from '@angular/router/router';
import { RegistrationComponent } from './registration/registration.component';
import { SigninComponent } from './sign-in/signin.component';

export function  pathMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult | null  {
  console.log('ssssssssssssssssssssssssssss-matcher', segments);
  if (segments.length === 0) {
    return null;
  }
  const matchedRoute = routes.find(d => d.path === segments[0].path);

  return !!matchedRoute ? {consumed: []} : null;
}

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
