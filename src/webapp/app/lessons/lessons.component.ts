import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {LessonService} from "./lessons.service";
import {Lesson} from "./lesson";
import {UserService} from "../users/services/users.service";

@Component({
  moduleId: module.id,
  selector: 'lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})

export class LessonComponent implements OnInit {
  sub: any;
  lessons: Array<Lesson>;
  userProf = false;

  ngOnInit(): void {
    this.lessons = [];
    this.sub = this.route.params.subscribe(() => {
      this.lessonService.getLessons().then(lessons => {
        this.userService.getMyProfile().then((user) => {
          user.roles.forEach((role) => {
            if (role == "PROFESSOR") {
              this.userProf = true;
            }
          });
        });
        this.lessons = lessons;
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.lessons = null;
  }

  constructor(private toastr: ToastsManager, private lessonService: LessonService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  goto(lesson: Lesson): void {
    this.router.navigate(['/lesson', lesson.id]);
  }

  myCreatedLessons(): void {
    this.router.navigate(['/lessons-created']);
  }
}
