import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Statuses } from 'src/app/models/request.enum';
import { ProductRequest } from 'src/app/models/requests.model';

@Component({
  selector: 'app-roadmap-card',
  templateUrl: './roadmap-card.component.html',
  styleUrls: ['./roadmap-card.component.scss'],
})
export class RoadmapCardComponent {
  @Input() productRequest: ProductRequest | undefined;
  @Output() sendUpvotes = new EventEmitter<{
    id: number | undefined;
    upvotes: number | undefined;
  }>();

  constructor(private router: Router) {}

  switchColorOfStatuses(status: string | undefined) {
    if (status == Statuses.PLANNED) {
      return 'planned-status';
    } else if (status == Statuses.IN_PROGRESS) {
      return 'in-progress-status';
    } else if (status == Statuses.LIVE) {
      return 'live-status';
    } else {
      return 'no-status';
    }
  }

  getBorderColorByStatus(status: string | undefined): string {
    switch (status) {
      case 'planned':
        return '#F49F85';
      case 'in-progress':
        return '#AD1FEA';
      case 'live':
        return '#62BCFA';
      default:
        return '#fff';
    }
  }

  goToSingleFeedback(id: number | undefined) {
    this.router.navigate(['feedback', id]);
  }

  upvote(id: number | undefined, upvotes: number | undefined) {
    this.sendUpvotes.emit({ id, upvotes });
  }
}
