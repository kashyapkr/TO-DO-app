package com.kashyap.todo.service;

import com.kashyap.todo.dto.TodoDto;

import java.util.List;

public interface TodoService {

    TodoDto addTodo(TodoDto todoDto);

    List<TodoDto> getAllTodos();
    TodoDto getTodoById(Long id);
    TodoDto updateTodo(TodoDto todoDto,Long id);

    void DeleteTodo(Long id);

    TodoDto setCompleted(Long id);

    TodoDto setInCompleted(Long id);

}
