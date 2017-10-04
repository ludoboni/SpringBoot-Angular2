import {Injectable} from "@angular/core";
import {Lesson} from "../lessons/lesson";
import {HttpService} from "../http/http.service";
import {User} from "../users/user";


@Injectable()
export class LessonService {
  lessonUrl = "lessons/";

  constructor(private httpService: HttpService) {
  }

  public getLessons(): Promise<Lesson[]> {
    return new Promise((resolve, reject) => {
      this.httpService.get(this.lessonUrl)
        .then(res => {
            let lessonsJSON = res.json();
            let lessons = Array<Lesson>();
            lessonsJSON.forEach(lessonJSON => {
              lessons.push(this.mapLesson(lessonJSON));
            });
            resolve(lessons);
          }
        ).catch((err) => {
        reject(this.handleError(err));
      });
    });
  }

  public createdLessons(): Promise<Lesson[]> {
    return new Promise((resolve, reject) => {
      this.httpService.get('created-lessons/')
        .then(res => {
            let lessonsJSON = res.json();
            let lessons = Array<Lesson>();
            lessonsJSON.forEach(lessonJSON => {
              lessons.push(this.mapLesson(lessonJSON));
            });
            resolve(lessons);
          }
        ).catch((err) => {
        reject(this.handleError(err));
      });
    });
  }

  public deleteLesson(id: number): Promise<Lesson[]> {
    return new Promise((resolve, reject) => {
      const url = `${this.lessonUrl}${id}`;
      this.httpService.delete(url)
        .then(res => {
            let lessonsJSON = res.json();
            let lessons = Array<Lesson>();
            lessonsJSON.forEach(lessonJSON => {
              lessons.push(this.mapLesson(lessonJSON));
            });
            resolve(lessons);
          }
        ).catch((err) => {
        reject(this.handleError(err));
      });
    });
  }

  public createLesson(title: string, description: string, content: string): Promise<Lesson[]> {
    return new Promise((resolve, reject) => {
      this.httpService
        .post(this.lessonUrl, {title: title, description: description, content: content})
        .then(res => {
          let lessonsJSON = res.json();
          let lessons = Array<Lesson>();
          lessonsJSON.forEach(lessonJSON => {
            lessons.push(this.mapLesson(lessonJSON));
          });
          resolve(lessons);
        })
        .catch(this.handleError);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public getLesson(id: number) {
    const url = `${this.lessonUrl}${id}`;
    return this.httpService.get(url)
      .then(res => this.mapLesson(res.json()))
      .catch(this.handleError);
  }

  public linkStudent(user: number, id: number) {
    const url = `lessons-link/${user}/${id}`;
    return this.httpService.get(url)
      .then(res => this.mapLesson(res.json()))
      .catch(this.handleError);
  }

  public unlinkStudent(id: number, user: number) {
    const url = `lessons-unlink/${id}`;
    return this.httpService.get(url)
      .then(res => this.mapLesson(res.json()))
      .catch(this.handleError);
  }



  public getStudents(id: number, user: number) {
    const url = `lessons-students/${id}`;
    return this.httpService.get(url)
      .then(res => this.mapUser(res.json()))
      .catch(this.handleError);
  }

  public modifyLesson(lesson: Lesson) {
    const url = `${this.lessonUrl}`;
    let obj = {id: lesson.id, description: lesson.description, title: lesson.title, content: lesson.content};
    return this.httpService.put(url, obj)
      .then(res => this.mapLesson(res.json()))
      .catch(this.handleError);
  }

  private mapLesson(lessonJSON): Lesson {
    let lesson = new Lesson();
    lesson.id = lessonJSON.id;
    lesson.description = lessonJSON.description;
    lesson.title = lessonJSON.title;
    lesson.content = lessonJSON.content;
    return lesson;
  }

  private mapUser(obj) {
    let user = new User();
    user.username = obj.username;
    user.firstName = obj.firstName;
    user.lastName = obj.lastName;
    user.email = obj.email;
    user.id = obj.id;
    user.roles = obj.roles;
    console.log(user);
    return user;
  }
}
