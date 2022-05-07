import { Component, OnInit } from '@angular/core';
import { Post } from './home';
import { HomeService } from './home.component.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.css"],
  animations: [
    trigger("flipState", [
      state(
        "active",
        style({
          transform: "rotateY(179deg)",
        })
      ),
      state(
        "inactive",
        style({
          transform: "rotateY(0)",
        })
      ),
      transition("active => inactive", animate("500ms ease-out")),
      transition("inactive => active", animate("500ms ease-in")),
    ]),
  ],
})

export class HomeComponent implements OnInit {

  public postList: Post[];
  readonly ID: string = "ID";
  readonly USERID: string = "USERID";


  constructor(private homeService: HomeService
  ) {

  }

  ngOnInit() {
    this.homeService.getPosts().subscribe((res) => {
      if (res) {
        this.postList = res;
      }
    });
  }
  toggleFlip(post: Post) {
    post.flip = (post.flip === 'inactive' || post.flip === undefined) ? 'active' : 'inactive';
    post.selectedSide = post.selectedSide === this.ID || post.selectedSide === undefined ? this.USERID : this.ID;
  }
}
