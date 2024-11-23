import React from "react";
import { Button } from "./Button";

type TaskListPropsType = {
  taskId: number;
  title: string;
  isDone: boolean;
};
type DataPropsType = {
  title: string;
  students: string[];
  tasks: TaskListPropsType[];
};

type TasksPropsType = {
  data: DataPropsType;
};

export const Tasks = (props: TasksPropsType) => {
  return (
    <div>
      <div>
        <h3>{props.data.title}</h3>
        <div>
          <input />
          <Button title="+" />
        </div>

        <ul>
          {props.data.tasks.map((tasks) => (
            <li key={tasks.taskId}>
              <input type="checkbox" checked={tasks.isDone} />
              <span>{tasks.title} </span>
            </li>
          ))}
        </ul>
        <div>
          <b>Student List:</b>
          {props.data.students.map((students) => (
            <p>{students}</p>
          ))}
        </div>
        <div>
          <Button title="All" />
          <Button title="Active" />
          <Button title="Completed" />
        </div>
      </div>
    </div>
  );
};

