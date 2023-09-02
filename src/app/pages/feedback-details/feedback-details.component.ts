import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ProductRequest, User } from 'src/app/models/requests.model';
import { ApiService } from 'src/app/services/api.service';
import { getTotalCommentCount } from 'src/app/utils/helper.fn';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.scss'],
})
export class FeedbackDetailsComponent implements OnInit {
  currentProductId: number = 0;
  currentUser: User | undefined;
  idToBeAssigned: number = 0;
  currentProductRequest$: Observable<ProductRequest> | undefined;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.currentProductId = params['id'];
    });
    this.getCurrentUser();
    this.getLengthsOfAllComments();
    this.getSingleProductRequest();
  }

  editProductRequest() {
    this.router.navigate(['add-feedback', this.currentProductId]);
  }

  getCurrentUser() {
    this.apiService
      .getCurrentUser()
      .subscribe((user) => (this.currentUser = user));
  }

  getLengthsOfAllComments() {
    this.apiService
      .getLengthOfAllComments()
      .subscribe((length) => (this.idToBeAssigned = length));
  }

  getSingleProductRequest() {
    this.currentProductRequest$ = this.apiService
      .getSingleProductRequest(this.currentProductId)
      .pipe(
        map((productRequest) => {
          return {
            ...productRequest,
            totalCommentCount: getTotalCommentCount(productRequest.comments),
          };
        })
      );
  }

  updateVotesHandler(item: ProductRequest) {
    this.apiService
      .updateUpvotes(item.id, item.upvotes + 1)
      .subscribe((x) => this.getSingleProductRequest());
  }

  addCommentHandler(content: string) {
    const newComment = {
      id: this.idToBeAssigned + 1,
      content,
      user: this.currentUser,
    };
    let updatedCommentsArray: any = [];
    this.currentProductRequest$?.subscribe((productRequest) => {
      updatedCommentsArray = [...productRequest.comments, newComment];
      this.apiService
        .addComment(this.currentProductId, updatedCommentsArray)
        .subscribe(() => {
          this.getSingleProductRequest();
        });
    });
  }
}
