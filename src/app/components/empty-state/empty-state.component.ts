import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {
  constructor(private router: Router) {}
  goToAddFeedbackPage() {
    this.router.navigate(['add-feedback', 0]);
  }
}
