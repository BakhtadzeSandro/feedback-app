import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsPageComponent } from './pages/suggestions-page/suggestions-page.component';
import { AddFeedbackComponent } from './pages/add-feedback/add-feedback.component';
import { FeedbackDetailsComponent } from './pages/feedback-details/feedback-details.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionsPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'add-feedback/:id',
    component: AddFeedbackComponent,
  },
  {
    path: 'feedback/:id',
    component: FeedbackDetailsComponent,
  },
  {
    path: 'roadmap',
    component: RoadmapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
