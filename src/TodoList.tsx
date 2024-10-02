import React, {useState, KeyboardEvent, ChangeEvent} from "react";
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
    filter: FilterValuesType;
    arr: TaskType[];
    removeTask: (taskId: string) => void;
    changeFilter: (newFilterValue: FilterValuesType) => void;
    addTask: (title: string) => void;
    setTaskNewStatus: (taskId: string, isDone: boolean) => void;

};

export const TodoList = ({
                             titleH3,
                             removeTask,
                             arr,
                             changeFilter,
                             addTask,
                             setTaskNewStatus,
                             filter
                         }: TodoListPopsType) => {

    const [taskTitle, setTaskTitle] = useState("");
    const [taskInputError, setTaskInputError] = useState(false);
    const isTitleLengthValid = taskTitle.length <= 15

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler();
        }
    }

    const addTaskHandler = () => {
        const croppedTaskTitle = taskTitle.trim();
        if (croppedTaskTitle) {
            if (isTitleLengthValid) {
                addTask(taskTitle);
                setTaskTitle("");
            }
        } else {
            setTaskInputError(true);
            setTaskTitle("");
        }


    }


    const taskList: Array<JSX.Element> = arr.map((arr: TaskType) => {

                const removeTaskHandler = () => removeTask(arr.id)
                const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    setTaskNewStatus(arr.id, e.currentTarget.checked);
                }
                return (
                    <li key={arr.id}>
                        <input type="checkbox" checked={arr.isActive} onChange={setTaskNewStatusHandler}/>
                        <span className={arr.isActive ? "task-done" : "task"}>{arr.title}</span>
                        <Button title={"X"} onClickHandler={removeTaskHandler}/>

                    </li>
                );
            }
        )
    ;

    return (
        <TodoListStyled>
            <div>
                <h3>{titleH3}</h3>
                <div>
                    <input onKeyDown={onKeyDownAddTaskHandler} placeholder={"max 15 characters"} value={taskTitle}
                           onChange={(e) => {
                               taskInputError && setTaskInputError(false);
                               setTaskTitle(e.target.value)
                           }}
                           className={taskInputError ? "error-input" : ""}
                    />
                    <Button disabled={!isTitleLengthValid} onClickHandler={addTaskHandler} title="+"/>
                    {!isTitleLengthValid && <div style={{color: "red"}}>Max length title is 15 characters</div>}
                    {taskInputError && <div style={{color: "red"}} color={"red"}>Title is required!!!</div>}
                </div>
                {arr.length === 0 ? (
                    <p>your tasks were not found</p>
                ) : (
                    <ul>{taskList}</ul>
                )}
                <div>
                    <Button className={filter === "all" ? "filter-button" : ""} title="All"
                            onClickHandler={() => changeFilter("all")}/>
                    <Button className={filter === "active" ? "filter-button" : ""} title="Active"
                            onClickHandler={() => changeFilter("active")}/>
                    <Button className={filter === "completed" ? "filter-button" : ""} title="Completed"
                            onClickHandler={() => changeFilter("completed")}/>

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
