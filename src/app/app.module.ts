import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SuggestionsPageComponent } from './pages/suggestions-page/suggestions-page.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { AppRoutingModule } from './app-routing.module';
import { SideSettingsComponent } from './components/side-settings/side-settings.component';
import { SuggestionsHeaderComponent } from './components/suggestions-header/suggestions-header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductRequestComponent } from './components/product-request/product-request.component';
import { HttpClientModule } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { AddFeedbackComponent } from './pages/add-feedback/add-feedback.component';
import { GenericRequestComponent } from './components/generic-request/generic-request.component';
import { FeedbackDetailsComponent } from './pages/feedback-details/feedback-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { ProductCommentsComponent } from './components/product-comments/product-comments.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RoadmapListComponent } from './components/roadmap-list/roadmap-list.component';
import { RoadmapCardComponent } from './components/roadmap-list/roadmap-card/roadmap-card.component';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SuggestionsPageComponent,
    RoadmapComponent,
    SideSettingsComponent,
    SuggestionsHeaderComponent,
    ProductRequestComponent,
    EmptyStateComponent,
    AddFeedbackComponent,
    GenericRequestComponent,
    FeedbackDetailsComponent,
    NewCommentComponent,
    ProductCommentsComponent,
    DeleteDialogComponent,
    RoadmapListComponent,
    RoadmapCardComponent,
    ShortenPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [TitleCasePipe, ShortenPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
