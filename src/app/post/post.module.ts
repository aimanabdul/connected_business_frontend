import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './services/post.service';
import { ViewPostComponent } from './view-post/view-post.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../user/services/user.service';
import { LikeService } from './services/like.service';
import { CommentService } from './services/comment.service';

@NgModule({
  declarations: [ViewPostComponent],
  providers: [PostService, UserService, LikeService, CommentService],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PostModule { }
