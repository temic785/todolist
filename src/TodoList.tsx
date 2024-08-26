import React from "react";
import styled from "styled-components";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number;
    title: string;
    isActive: boolean;
};

type TodoListPopsType = {
    titleH3: string;
    arr: TaskType[];
    removeTask: (taskId: number) => void;
    changeFilter: (newFilterValue: FilterValuesType) => void

};

export const TodoList = ({titleH3, removeTask, arr, changeFilter}: TodoListPopsType) => {
    const taskList: Array<JSX.Element> = arr.map((arr) => {
        return (
            <li key={arr.id}>
                <input type="checkbox" checked={arr.isActive}/>
                <span>{arr.title}</span>
                {/*<button onClick={() => (props.removeTask(arr.id))}>X</button>*/}
                <Button title={"X"} onClickHandler={() => removeTask(arr.id)}/>
            </li>
        );
    });

    return (
        <TodoListStyled>
            <div>
                <h3>{titleH3}</h3>
                <div>
                    <input/>
                    <Button title="+"/>
                </div>
                {arr.length === 0 ? (
                    <p>your tasks were not found</p>
                ) : (
                    <ul>{taskList}</ul>
                )}
                <div>
                    <Button title="All" onClickHandler={() => changeFilter("all")}/>
                    <Button title="Active" onClickHandler={() => changeFilter("active")}/>
                    <Button title="Completed" onClickHandler={() => changeFilter("completed")}/>

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
