import {Lesson} from "./lesson";
import {
  OnDestroy, OnInit, Component
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location}               from '@angular/common';
import {ToastsManager} from "ng2-toastr";
import {LessonService} from "./lessons.service";
import {User} from "../users/user";
import {UserService} from "../users/services/users.service";
@Component({
  moduleId: module.id,
  selector: 'lesson-create-detail',
  templateUrl: './lesson-create-detail.component.html',
  styleUrls: ['./lessons.component.css']
})

export class LessonCreateDetailComponent implements OnInit, OnDestroy {
  lesson: Lesson;
  sub: any;
  user;
users: Array<User>;
  constructor(private toastr: ToastsManager, private lessonService: LessonService, private route: ActivatedRoute, private location: Location, private userService: UserService) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.lessonService.getLesson(+params['id']).then(lesson => {
        this.lesson = lesson;
        this.userService.getUsers().then(users => {
          this.users = users;
        })
      });
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.lesson = null;
  }


  update() {

  }

  link(user) {
    this.lessonService.linkStudent(this.lesson.id, user).then((res)=> {
      console.log(res);
    })
  }

  goBack(): void {
    this.location.back();
  }
}
