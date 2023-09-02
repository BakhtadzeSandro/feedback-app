import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductRequest, UpvotesHandler } from 'src/app/models/requests.model';

@Component({
  selector: 'app-roadmap-list',
  templateUrl: './roadmap-list.component.html',
  styleUrls: ['./roadmap-list.component.scss'],
})
export class RoadmapListComponent implements OnInit {
  @Input() roadmapProductRequests: ProductRequest[] | undefined;
  @Output() upvotes = new EventEmitter<{
    id: number | undefined;
    upvotes: number | undefined;
  }>();

  ngOnInit() {
    this.getInProgressRequests();
    this.getLiveRequests();
    this.getPlannedRequests();
  }

  getLiveRequests() {
    return this.roadmapProductRequests?.filter(
      (request) => request.status == 'live'
    );
  }

  getInProgressRequests() {
    return this.roadmapProductRequests?.filter(
      (request) => request.status == 'in-progress'
    );
  }

  getPlannedRequests() {
    return this.roadmapProductRequests?.filter(
      (request) => request.status == 'planned'
    );
  }

  upvotesHandler(event: UpvotesHandler) {
    this.upvotes.emit({ id: event.id, upvotes: event.upvotes });
  }
}
