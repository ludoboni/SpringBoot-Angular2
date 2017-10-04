import {Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {LessonService} from "./lessons.service";
import {Lesson} from "./lesson";
import {UserService} from "../users/services/users.service";
import {User} from "../users/user";
declare var tinymce: any;

@Component({
  moduleId: module.id,
  selector: 'lessons-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lessons.component.css']
})

export class LessonCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() onEditorKeyup = new EventEmitter<any>();
  sub: any;
  lessons: Array<Lesson>;
  userProf = false;
  editor;
  content;

  ngOnInit(): void {
    this.lessons = [];
    this.sub = this.route.params.subscribe(() => {
      this.lessonService.createdLessons().then(lessons => {
        this.userService.getMyProfile().then((user) => {
          user.roles.forEach((role) => {
            if (role == "PROFESSOR") {
              this.userProf = true;
            }
          });
          if (!this.userProf) {
            this.toastr.error('You can\'t do that.');
            this.router.navigate(['/']);
          }
        });
        this.lessons = lessons;
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.lessons = null;
    tinymce.remove(this.editor);
  }

  ngAfterViewInit(): void {
    tinymce.init({
      selector: '#editor',
      plugins: ['link', 'paste', 'table'],
      skin_url: './assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.content = content;
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  constructor(private toastr: ToastsManager, private lessonService: LessonService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  add(title:string, description:string){
    this.lessonService.createLesson(title, description, this.content).then(lessons => {
      this.lessons = lessons;
      this.toastr.info('Lesson created.');
    });
  }

  goto(lesson: Lesson): void {
    this.router.navigate(['/lessons-created', lesson.id]);
  }
}
