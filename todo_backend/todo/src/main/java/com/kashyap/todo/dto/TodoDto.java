package com.kashyap.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TodoDto {

    private Long id;
    private String title;
    private String description;
    private Boolean completed;
}
