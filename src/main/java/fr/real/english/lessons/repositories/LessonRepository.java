package fr.real.english.lessons.repositories;

import org.springframework.data.repository.CrudRepository;

import fr.real.english.lessons.models.Lesson;
import fr.real.english.users.models.Account;

import java.util.Set;

public interface LessonRepository extends CrudRepository<Lesson, Long> {

  public Set<Lesson> findByCreator(Account creator);
}
