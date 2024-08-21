import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

export type ArrLiPropsType = {
  id: number;
  title: string;
  isActive: boolean;
};

type TodoListPopsType = {
  titleH3: string;
  arr: ArrLiPropsType[];
};

export const TodoList = (props: TodoListPopsType) => {
  const taskList: Array<JSX.Element> = props.arr.map((arr) => {
    return (
      <li>
        <input type="checkbox" checked={arr.isActive} />
        <span>{arr.title}</span>
      </li>
    );
  });

  return (
    <TodoListStyled>
      <div>
        <h3>{props.titleH3}</h3>
        <div>
          <input />
          <Button title="+" />
        </div>
        {props.arr.length === 0 ? (
          <p>your tasks were not found</p>
        ) : (
          <ul>{taskList}</ul>
        )}
        <div>
          <Button title="All" />
          <Button title="Active" />
          <Button title="Completed" />
        </div>
      </div>
    </TodoListStyled>
  );
};

export const TodoListStyled = styled.div`
  background-color: #3cdfb6;
  border: 2px solid black;
  border-radius: 10%;
  padding: 10px;
  height: 100%;
`;
