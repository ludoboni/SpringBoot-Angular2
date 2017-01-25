package com.web.atrio.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.atrio.models.Task;

@RestController
public class TodoController {

	private static ArrayList<Task> tasks = new ArrayList<Task>();
	private static int idCounter = 0;

	@RequestMapping(value = "/tasks", method = RequestMethod.GET)
	public ResponseEntity<List<Task>> getTasks() {
		System.out.println("Tasks requested!");
		return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
	}

	@RequestMapping(value = "/tasks", method = RequestMethod.POST)
	public ResponseEntity<List<Task>> addTask(@RequestBody Task task) {
		idCounter++;
		task.setId(idCounter);
		tasks.add(task);
		System.out.println("Task added!");
		return new ResponseEntity<List<Task>>(tasks, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/tasks/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<List<Task>> deleteTask(@PathVariable(value = "id") int id) {
		Task toDelete = null;
		for(Task task : tasks){
			if(task.getId() == id){
				toDelete = task;
			}
		}
		if(toDelete != null){
			tasks.remove(toDelete);
		}
		System.out.println("Task deleted!");
		return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
	}
}