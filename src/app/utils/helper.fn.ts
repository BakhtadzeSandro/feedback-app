import { Comment } from '../models/requests.model';

export function getTotalCommentCount(comments: Comment[]): number {
  if (comments != undefined) {
    let totalCount = comments.length;

    for (const comment of comments) {
      if (comment.replies) {
        totalCount += comment.replies.length;
      }
    }
    return totalCount;
  } else {
    return 0;
  }
}
