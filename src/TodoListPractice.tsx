import React from "react";
import styled from "styled-components";
import {Button} from "./Button";

export type TasksTypePractice = {
    id: number;
    title: string;
    isActive: boolean;
};

type TodoListPopsType = {
    titleH3: string;
    tasks: TasksTypePractice[];
    removeTask: (taskId: number) => void;
};

export const TodoListPractice = (props: TodoListPopsType) => {
    const tasksList: Array<JSX.Element> = props.tasks.map((tasks) => {
        return (
            <li key={tasks.id}>
                <input type="checkbox" checked={tasks.isActive}/>
                <span>{tasks.title}</span>
                <button onClick={() => props.removeTask(tasks.id)}>X</button>
            </li>
        );
    });

    return (
        <TodoListStyled>
            <div>
                <h3>{props.titleH3}</h3>
                <div>
                    <input/>
                    <Button title="+"/>
                </div>
                {props.tasks.length === 0 ? (
                    <p>your tasks were not found</p>
                ) : (
                    <ul>{tasksList}</ul>
                )}
                <div>
                    <Button title="All"/>
                    <Button title="Active"/>
                    <Button title="Completed"/>
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
