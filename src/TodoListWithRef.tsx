import React from "react";
import styled from "styled-components";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string;
    title: string;
    isActive: boolean;
};

type TodoListPopsType = {
    titleH3: string;
    arr: TaskType[];
    removeTask: (taskId: string) => void;
    changeFilter: (newFilterValue: FilterValuesType) => void;
    addTask: (title: string) => void;

};

export const TodoList = ({titleH3, removeTask, arr, changeFilter, addTask}: TodoListPopsType) => {

    const inputRef = React.useRef<HTMLInputElement>(null);


    const addTaskHandler = () => {
        if (inputRef.current) {
            console.log("dasf")

            addTask(inputRef.current.value);
        }
    }


    const taskList: Array<JSX.Element> = arr.map((arr) => {
        return (
            <li key={arr.id}>
                <input type="checkbox" checked={arr.isActive}/>
                <span>{arr.title}</span>
                <Button title={"X"} onClickHandler={() => {
                    removeTask(arr.id)
                }}/>

            </li>
        );
    });

    return (
        <TodoListStyled>
            <div>
                <h3>{titleH3}</h3>
                <div>
                    <input ref={inputRef} placeholder={"max length title is 15 characters"}/>
                    <Button onClickHandler={addTaskHandler} title="+"/>
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
    background-color: #48c968;
    border: 2px solid black;
    border-radius: 10%;
    padding: 10px;
    height: 100%;
`;
