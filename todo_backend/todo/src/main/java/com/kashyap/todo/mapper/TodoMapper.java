package com.kashyap.todo.mapper;


import com.kashyap.todo.dto.TodoDto;
import com.kashyap.todo.entity.Todo;
import org.springframework.stereotype.Component;

@Component
public class TodoMapper {

    public static TodoDto mapToDTO(Todo todo){
        TodoDto todoDto = new TodoDto();
        todoDto.setId(todo.getId());
        todoDto.setTitle(todo.getTitle());
        todoDto.setDescription(todo.getDescription());
        todoDto.setCompleted(todo.getCompleted());
        return todoDto;
    }
    public static  Todo mapToTodo(TodoDto todoDto){
        Todo todo = new Todo();
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.getCompleted());
        return todo;
    }
    public static void updateTodoFromDto(Todo todo, TodoDto todoDto) {
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.getCompleted());

    }
}
