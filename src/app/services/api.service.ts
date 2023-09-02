import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap } from 'rxjs';
import {
  NewFeedback,
  ProductRequest,
  User,
  changedProduct,
} from '../models/requests.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getLengthOfAllComments(): Observable<number> {
    return this.http
      .get<any[]>(environment.jsonServerBase + '/productRequests')
      .pipe(
        map((productRequests) => {
          let allCommentsLength = 0;

          // Iterate through each productRequest and accumulate comments lengths
          productRequests.forEach((productRequest) => {
            if (productRequest.comments) {
              allCommentsLength += productRequest.comments.length;
            }
          });

          return allCommentsLength;
        })
      );
  }

  getNonSuggestedProductsInformation(): Observable<any[]> {
    return this.http
      .get<ProductRequest[]>(environment.jsonServerBase + '/productRequests')
      .pipe(
        switchMap((productRequests) => {
          const nonSuggestedProductRequests = productRequests.filter(
            (productRequest) => productRequest.status !== 'suggestion'
          );

          const statusSummary = nonSuggestedProductRequests.reduce(
            (summary, productRequest) => {
              const status = productRequest.status;
              if (!summary[status]) {
                summary[status] = 1;
              } else {
                summary[status]++;
              }
              return summary;
            },
            {} as { [status: string]: number }
          );

          const statusItems = Object.keys(statusSummary).map((status) => ({
            status,
            length: statusSummary[status],
          }));

          const defaultStatuses = ['Planned', 'In-Progress', 'Live'];
          const defaultStatusItems = defaultStatuses.map((status) => ({
            status,
            length: 0,
          }));

          return of(statusItems.length > 0 ? statusItems : defaultStatusItems);
        })
      );
  }

  getSuggestedProductRequests(category: string): Observable<ProductRequest[]> {
    return this.http
      .get<ProductRequest[]>(environment.jsonServerBase + '/productRequests')
      .pipe(
        map((productRequests) => {
          if (category == 'all' || category == '') {
            return productRequests.filter(
              (productRequest) => productRequest.status == 'suggestion'
            );
          } else {
            return productRequests.filter(
              (productRequest) =>
                productRequest.status == 'suggestion' &&
                productRequest.category == category
            );
          }
        })
      );
  }

  getNonSuggestedProductRequests(): Observable<ProductRequest[]> {
    return this.http
      .get<ProductRequest[]>(environment.jsonServerBase + '/productRequests')
      .pipe(
        map((productRequests) => {
          return productRequests.filter(
            (productRequest) => productRequest.status !== 'suggestion'
          );
        })
      );
  }

  getSingleProductRequest(id: number): Observable<ProductRequest> {
    return this.http.get<ProductRequest>(
      environment.jsonServerBase + '/productRequests/' + id
    );
  }

  addNewFeedback(newFeedback: NewFeedback): Observable<NewFeedback> {
    console.log(newFeedback);
    return this.http.post<NewFeedback>(
      environment.jsonServerBase + '/productRequests',
      newFeedback
    );
  }

  updateUpvotes(id: number | undefined, upvotes: number | undefined) {
    return this.http.patch(
      environment.jsonServerBase + '/productRequests/' + id,
      {
        upvotes: upvotes,
      }
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.jsonServerBase + '/currentUser');
  }

  addComment(id: number, comments: Comment[]) {
    console.log(comments);
    return this.http.patch(
      environment.jsonServerBase + '/productRequests/' + id,
      {
        comments,
      }
    );
  }

  editProductRequest(id: number, changedProductRequest: changedProduct) {
    return this.http.patch(
      environment.jsonServerBase + '/productRequests/' + id,
      {
        title: changedProductRequest.title,
        category: changedProductRequest.category?.toLocaleLowerCase(),
        status: changedProductRequest.status?.toLocaleLowerCase(),
        description: changedProductRequest.feedbackDetails,
      }
    );
  }

  deleteProductRequest(id: number) {
    return this.http.delete(
      environment.jsonServerBase + '/productRequests/' + id
    );
  }
}
