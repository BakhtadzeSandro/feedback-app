import { FormControl } from '@angular/forms';

export interface ProductRequest {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comment[];
  totalCommentCount?: number;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies: Reply[];
}

export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export interface Form {
  title: FormControl<string | null>;
  category: FormControl<string | null>;
  feedbackDetails: FormControl<string | null>;
  status?: FormControl<string | null>;
}

export interface NewFeedback {
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comment[];
}

export interface changedProduct {
  title: string | null | undefined;
  category: string | null | undefined;
  status: string | null | undefined;
  feedbackDetails: string | null | undefined;
}

export interface UpvotesHandler {
  id: number | undefined;
  upvotes: number | undefined;
}
