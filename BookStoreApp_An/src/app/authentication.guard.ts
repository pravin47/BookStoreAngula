import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private Authguardservice: AuthGuardService, private router: Router) {}
  canActivate(): boolean {
      if (!this.Authguardservice.gettoken()) {
          this.router.navigateByUrl('login');
      }
      return this.Authguardservice.gettoken();
  }

  
}
