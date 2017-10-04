package fr.real.english.lessons.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import fr.real.english.users.models.Account;

@Entity
public class Lesson {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @JsonIgnore
  @OneToOne
  @NotNull
  private Account creator;

  @JsonIgnore
  @OneToMany
  @JoinColumn(name = "students")
  private Set<Account> students;

  @NotNull
  private String content;

  @NotNull
  private String title;

  @NotNull
  private String description;

  public Lesson() {
    this.students = new HashSet<>();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Account getCreator() {
    return creator;
  }

  public void setCreator(Account creator) {
    this.creator = creator;
  }

  public Set<Account> getStudents() {
    return students;
  }

  public void setStudents(Set<Account> students) {
    this.students = students;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void addStudent(Account student){
    if(!this.students.contains(student)){
      this.students.add(student);
    }
  }

  public void removeStudent(Account student){
    if(this.students.contains(student)) {
      this.students.remove(student);
    }
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Lesson lesson = (Lesson) o;

    if (id != null ? !id.equals(lesson.id) : lesson.id != null) return false;
    return creator != null ? creator.equals(lesson.creator) : lesson.creator == null;
  }
}
