import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from '../services/post.service';
import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/services/user.service';
import { LikeService } from '../services/like.service';
import { Like } from 'src/app/models/like.model';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from '../services/comment.service';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  constructor(
    private _postService: PostService, 
    private router: Router, 
    private _userService: UserService,
    private _likeService: LikeService,
    private _commentService: CommentService,
  ) { }

  posts: Post[];
  companyID = localStorage.getItem("companyID"); 
  authUserID = localStorage.getItem("userID")
  successMessage: string = null;
  errorMessage: string = null;
  
  ngOnInit(): void {
    this.findPostsByCompanyId(this.companyID);
    

  }

  findPostsByCompanyId(id: string){
    //api call
    this._postService.findPostsByCompanyId(id).subscribe(res => {
      this.posts = res
      console.log(res)
    },
    err => {
      this.errorMessage = "Fout  bij het opladen van posts";
    }
    )
  }

  post = {} as Post;
  onSubmitPostForm(f: NgForm){
    if(!f.value.text){
      this.errorMessage = "Content leeg!";
      return;
    }
    this.post.text = f.value.text;
    this.post.companyID = this.companyID
    // find authUser by user id and update author in the post
    this.findUserByIdAndUpdatePostAuthorAndCreate(this.authUserID);
    
  }

  authUser = {} as User;
  findUserByIdAndUpdatePostAuthorAndCreate(id: string){
    this._userService.findUserById(id).subscribe(res => {
      this.authUser = res
      // update post with author
      this.post.author = this.authUser;
      // create the post
      this.createPost(this.post)
      this.findPostsByCompanyId(this.companyID);
      },
      err => {this.errorMessage = err.error.message;}
    )
  }

  createPost(post: Post){
    this._postService.createPost(post).subscribe(res =>{
      this.errorMessage = null;
      this.successMessage = "Post is geplaatst!";

      },
      err => {this.errorMessage = err.error.message;}
    )
  }

  like = {} as Like;
  likeAfterCreated = {} as Like;
  post2 = {} as Post

  onClickLike(postID: string){
    this.like.userID = this.authUserID;
    this.like.postID = postID;
    console.log(this.like)
    this.createLike(this.like)
  }

  createLike(like: Like){
    this._likeService.createLike(like).subscribe(res =>{
      // save the created like into likeAfterCreated
      //this.likeAfterCreated = res;
      console.log(res)
      // find the post to update the likes array in it
      //this.findPostById(postID);
      
      },
     err =>{this.errorMessage = "Fout bij het aanmaken van like"}
    )
  }


  findPostById(id: string){
    this._postService.findPostById(id).subscribe(res =>{
      this.post2 = res
      this.post2.likes.push(this.likeAfterCreated)
      this.updatePost(this.post2._id, this.post2)
    },
    err => {this.errorMessage = "Fout bij het laden van post om likes te updaten"}
    )
  }
  updatePost(id: string, post: Post){
    this._postService.updatePost(id, post).subscribe(res =>{
      this.successMessage = "Like is toegevoegd aan post"
    },
    err => {this.errorMessage = "Fout bij het updaten van post"}
    )
  }

  postID = "";
  onClickComment(id: string){
    this.findAllCommentsByPostId(id);
    this.postID = id
  }

  comments: Comment[];
  findAllCommentsByPostId(id: string){
    this._commentService.findAllCommentsByPostId(id).subscribe(res => {
      this.comments = res;
      console.log(id);
      console.log(res);
      },
      err => {this.errorMessage = err.error.message;}
    )
  }

  comment = {} as Comment;
  onSubmitCommentForm(f: NgForm){
    if(!f.value.comment){
      this.errorMessage = "Iput vereist!";
      return;
    }
    this.comment.text = f.value.comment;
    this.comment.postID = this.postID;
    this.comment.userID = this.authUserID
    this.createComment(this.comment);
    //this.findUserByIdAndUpdateComment(this.authUserID);
    
  }

  findUserByIdAndUpdateComment(id: string){
    this._userService.findUserById(id).subscribe(res => {
      //this.comment.user = res;
    },
    err => {this.errorMessage = err.error.message;}
    )
    this.createComment(this.comment);
  
  }

  createComment(comment: Comment){
    this._commentService.createComment(comment).subscribe(res => {
      this.errorMessage = null;
      this.successMessage = "Reactie is toegevoegd"
      
    },
    err => {
      this.errorMessage = err.error.message;
    }
    )
  }






}
