package com.kashyap.todo.repository;

import com.kashyap.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepo extends JpaRepository<Todo,Long> {

}
