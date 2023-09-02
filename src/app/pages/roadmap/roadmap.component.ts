import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductRequest, UpvotesHandler } from 'src/app/models/requests.model';
import { ApiService } from 'src/app/services/api.service';
import { getTotalCommentCount } from 'src/app/utils/helper.fn';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
})
export class RoadmapComponent implements OnInit {
  roadmapProductRequests$: Observable<ProductRequest[]> | undefined;
  constructor(private apiService: ApiService) {}

  getNonSuggestedData() {
    this.roadmapProductRequests$ = this.apiService
      .getNonSuggestedProductRequests()
      .pipe(
        map((productRequests) => {
          return productRequests.map((productRequest) => ({
            ...productRequest,
            totalCommentCount: getTotalCommentCount(productRequest.comments),
          }));
        })
      );
  }

  ngOnInit() {
    this.getNonSuggestedData();
  }

  upvotesHandler(event: UpvotesHandler) {
    if (event.upvotes) {
      this.apiService
        .updateUpvotes(event.id, event.upvotes + 1)
        .subscribe(() => {
          this.getNonSuggestedData();
        });
    }
  }
}
