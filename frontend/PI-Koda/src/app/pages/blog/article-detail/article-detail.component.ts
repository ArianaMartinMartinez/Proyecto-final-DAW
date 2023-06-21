import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-article',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article = new Article();
  photo = '';
  hasLoaded = false;

  constructor(
    private _route: ActivatedRoute,
    private _blogsService: BlogsService,
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }

  private getArticle() {
    const id = this._route.snapshot.paramMap.get('id');
    if(id) {
      this._blogsService.getBlogById(id).subscribe({
        next: (rtn) => {
          this.article = rtn;
          this.photo = this.article.photo===null ? 'assets/default-background.png' : this.article.photo;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.hasLoaded = true;
        }
      });
    }
  }
}
