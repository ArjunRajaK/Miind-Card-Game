import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterModule, DialogModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  visible = true;
  constructor(private router: Router) {
    this.router.navigate(['/']);
  }

  startGame(): void {
    this.visible = false;
    this.router.navigate(['/grid']);
  }
}
