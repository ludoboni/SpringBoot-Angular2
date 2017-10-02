package fr.real.english.lessons.repositories;

import org.springframework.data.repository.CrudRepository;

import fr.real.english.lessons.models.Lesson;

public interface LessonRepository extends CrudRepository<Lesson, Long> {

}
