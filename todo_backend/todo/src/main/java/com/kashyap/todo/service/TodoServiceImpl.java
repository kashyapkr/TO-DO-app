package com.kashyap.todo.service;


import com.kashyap.todo.dto.TodoDto;
import com.kashyap.todo.entity.Todo;
import com.kashyap.todo.exception.ResourceNotFound;
import com.kashyap.todo.mapper.TodoMapper;
import com.kashyap.todo.repository.TodoRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements  TodoService{

    private TodoRepo todoRepo;
    private TodoMapper todoMapper;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todotoSave = TodoMapper.mapToTodo(todoDto);
        return TodoMapper.mapToDTO(todoRepo.save(todotoSave));
    }

    @Override
    public List<TodoDto> getAllTodos() {
        return todoRepo.findAll().stream().map(TodoMapper::mapToDTO).toList();
    }

    @Override
    public TodoDto getTodoById(Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow(()->new ResourceNotFound("Id not found"));
        return TodoMapper.mapToDTO(todo);
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow(()->new ResourceNotFound("Id not found"));
        TodoMapper.updateTodoFromDto(todo,todoDto);
        return TodoMapper.mapToDTO(todoRepo.save(todo));
    }

    @Override
    public void DeleteTodo(Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow(()->new ResourceNotFound("Id not found"));
        todoRepo.delete(todo);

    }

    @Override
    public TodoDto setCompleted(Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow(()->new ResourceNotFound("Id not found"));
        todo.setCompleted(Boolean.TRUE);
        Todo updatedTodo = todoRepo.save(todo);
        return TodoMapper.mapToDTO(updatedTodo);
    }

    @Override
    public TodoDto setInCompleted(Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow(()->new ResourceNotFound("Id not found"));
        todo.setCompleted(Boolean.FALSE);
        Todo updatedTodo = todoRepo.save(todo);
        return TodoMapper.mapToDTO(updatedTodo);
    }
}
