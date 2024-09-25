import React, {useState, KeyboardEvent} from "react";
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

    const [taskTitle, setTaskTitle] = useState("");
    const isTitleLengthValid = taskTitle.length <= 15

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler();
        }
    }

    const addTaskHandler = () => {
        if (isTitleLengthValid) {
            addTask(taskTitle);
            setTaskTitle("");
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
                    <input onKeyDown={onKeyDownAddTaskHandler} placeholder={"max 15 characters"} value={taskTitle}
                           onChange={(e) => setTaskTitle(e.target.value)}/>
                    <Button disabled={!isTitleLengthValid} onClickHandler={addTaskHandler} title="+"/>
                    {!isTitleLengthValid && <div>Max length title is 15 characters</div>}
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
