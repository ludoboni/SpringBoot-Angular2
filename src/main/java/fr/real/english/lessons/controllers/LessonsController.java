package fr.real.english.lessons.controllers;

import fr.real.english.exceptions.UnauthorizedException;
import fr.real.english.lessons.models.Lesson;
import fr.real.english.lessons.repositories.LessonRepository;
import fr.real.english.users.models.Account;
import fr.real.english.users.repositories.AccountRepository;
import fr.real.english.users.utilities.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/")
public class LessonsController {

	@Autowired
	AccountRepository accountRepository;

	@Autowired
	LessonRepository lessonRepository;

	@RequestMapping(value = "api/lessons/{lessonId}", method = RequestMethod.GET)
	public ResponseEntity<Lesson> getLesson(@PathVariable(value = "lessonId") Long id) {
		return new ResponseEntity<>(lessonRepository.findOne(id), HttpStatus.OK);
	}

	@RequestMapping(value = "api/lessons/", method = RequestMethod.GET)
	public ResponseEntity<List> myLessons(HttpServletRequest request) {
		Account loggedInUser = accountRepository.findByUsername(UserService.getUser(request));
		return new ResponseEntity (loggedInUser.getLessons(), HttpStatus.OK);
	}

	@RequestMapping(value = "api/created-lessons/", method = RequestMethod.GET)
	public ResponseEntity<Set> myCreatedLessons(HttpServletRequest request) {
		Account loggedInUser = accountRepository.findByUsername(UserService.getUser(request));
		Set<Lesson> resultSet = lessonRepository.findByCreator(loggedInUser);
		return new ResponseEntity<>(resultSet, HttpStatus.OK);
	}

	@RequestMapping(value = "api/lessons/", method = RequestMethod.POST)
	public ResponseEntity createLesson(@RequestBody Lesson lesson, HttpServletRequest request) {
		Account creator = accountRepository.findByUsername(UserService.getUser(request));
		lesson.setCreator(creator);
		lessonRepository.save(lesson);
		return new ResponseEntity<>(lessonRepository.findByCreator(creator), HttpStatus.CREATED);
	}

	@RequestMapping(value = "api/lessons/{lessonId}", method = RequestMethod.DELETE)
	public ResponseEntity deleteLesson(@PathVariable(value = "lessonId") Long id) {
		lessonRepository.delete(id);
		return new ResponseEntity<>(id, HttpStatus.OK);
	}

	@RequestMapping(value = "api/lessons/", method = RequestMethod.PUT)
	public ResponseEntity updateLesson(@RequestBody Lesson lesson, HttpServletRequest request)
			throws UnauthorizedException {
		Account loggedInUser = accountRepository.findByUsername(UserService.getUser(request));
		Lesson lessonFromDB = lessonRepository.findOne(lesson.getId());

		if (!loggedInUser.getRoles().contains("ADMIN") || !loggedInUser.equals(lessonFromDB.getCreator())) {
			throw new UnauthorizedException();
		}

		lessonFromDB.setContent(lesson.getContent());
		lessonFromDB.setDescription(lesson.getDescription());
		lessonFromDB.setTitle(lesson.getTitle());

		return new ResponseEntity<>(lessonRepository.save(lessonFromDB), HttpStatus.OK);
	}

	@RequestMapping(value = "api/lessons-link/{userId}/{lessonId}", method = RequestMethod.GET)
	public ResponseEntity linkStudentToLesson(@PathVariable(value = "lessonId") Long lessonId,
			@PathVariable(value = "userId") Long userId) {
		Account student = accountRepository.findOne(userId);
		Lesson lesson = lessonRepository.findOne(lessonId);
		lesson.addStudent(student);
		lesson = lessonRepository.save(lesson);
		student.addLesson(lesson);
		accountRepository.save(student);
    System.out.println(lesson.getStudents().size());
		return new ResponseEntity<>(lesson, HttpStatus.OK);
	}

	@RequestMapping(value = "api/lessons-students/{lessonId}", method = RequestMethod.GET)
	public ResponseEntity<Set> getStudentsForLesson(@PathVariable(value = "lessonId") Long lessonId) {
		Set<Account> students = lessonRepository.findOne(lessonId).getStudents();
		return new ResponseEntity<>(students, HttpStatus.OK);
	}

	@RequestMapping(value = "api/lessons-unlink/{userId}/{lessonId}", method = RequestMethod.GET)
	public ResponseEntity unlinkStudentFromLesson(@PathVariable(value = "lessonId") Long lessonId,
			@PathVariable(value = "userId") Long userId) {
		Account student = accountRepository.findOne(userId);
		Lesson lesson = lessonRepository.findOne(lessonId);

		lesson.removeStudent(student);
		return new ResponseEntity<>(lessonRepository.save(lesson), HttpStatus.OK);
	}
}
