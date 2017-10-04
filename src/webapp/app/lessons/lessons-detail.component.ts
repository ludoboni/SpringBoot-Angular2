import {Lesson} from "./lesson";
import {OnDestroy, OnInit, Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location}               from '@angular/common';
import {ToastsManager} from "ng2-toastr";
import {LessonService} from "./lessons.service";

@Component({
  moduleId: module.id,
  selector: 'lesson-detail',
  templateUrl: './lessons-detail.component.html',
  styleUrls: ['./lessons.component.css']
})

export class LessonDetailComponent implements OnInit, OnDestroy {
  lesson: Lesson;
  sub: any;

  constructor(private toastr: ToastsManager, private lessonService: LessonService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.lessonService.getLesson(+params['id']).then(task => {
        this.lesson = task;
      });
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.lesson = null;
  }

  goBack(): void {
    this.location.back();
  }
}
