import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: Article[] = [];
  hasLoaded = false;

  constructor(private _blogsService: BlogsService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this._blogsService.get().subscribe({
      next: (rtn) => {
        this.blogs = rtn;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.hasLoaded = true;
      },
    });
  }

  getBlogById(id: string) {
    this._blogsService.getBlogById(id).subscribe({
      next: (rtn) => {
        console.log('Blog', rtn);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      },
    });
  }
}
