import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  @Input()
  public blog: Article = new Article();

  photo = '';
  
  ngOnInit(): void {
    if(!this.blog) throw new Error('Blog property is required');
    this.photo = this.blog.photo===null ? 'assets/default-background.png' : this.blog.photo;
  }

}
