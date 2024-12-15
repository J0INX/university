import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [RouterModule],
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
