import React, {ChangeEvent} from "react";
import styled from "styled-components";
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string;
    title: string;
    isActive: boolean;
};

type TodoListPopsType = {
    todoListId: string
    titleH3: string;
    filter: FilterValuesType;
    tasks: TaskType[];
    removeTask: (taskId: string, todoListId: string) => void;
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    setTaskNewStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
    removeTodoList: (todoListId: string) => void
    updateTodoList: (todoListId: string, title: string) => void
    updateTask: (todoListId: string, taskId: string, title: string) => void

};

export const TodoList = ({
                             titleH3,
                             removeTask,
                             tasks,
                             changeTodoListFilter,
                             addTask,
                             setTaskNewStatus,
                             filter,
                             todoListId,
                             removeTodoList,
                             updateTodoList,
                             updateTask
                         }: TodoListPopsType) => {


    const addTaskHandler = (taskTitle: string) => {
        addTask(taskTitle, todoListId);
    }
    const updateTodoListHandler = (title: string) => {
        updateTodoList(todoListId, title)
    }

    const taskList: Array<JSX.Element> = tasks.map((arr: TaskType) => {

                const removeTaskHandler = () => removeTask(arr.id, todoListId)
                const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    setTaskNewStatus(arr.id, e.currentTarget.checked, todoListId);
                }
                const updateTaskHandler = (title: string) => {
                    updateTask(todoListId, arr.id, title)
                }
                return (
                    <li key={arr.id}>
                        <input type="checkbox" checked={arr.isActive} onChange={setTaskNewStatusHandler}/>
                        <EditableSpan value={arr.title} className={arr.isActive ? "task-done" : "task"}
                                      onChange={updateTaskHandler}/>
                        <Button title={"X"} onClickHandler={removeTaskHandler}/>

                    </li>
                );
            }
        )
    ;

    return (
        <TodoListStyled>
            <div>
                <h3>
                    <EditableSpan value={titleH3} onChange={updateTodoListHandler}/>
                    <Button title={"X"} onClickHandler={() => removeTodoList(todoListId)}/>
                </h3>

                <AddItemForm addItem={addTaskHandler}/>

                {tasks.length === 0 ? (
                    <p>your tasks were not found</p>
                ) : (
                    <ul>{taskList}</ul>
                )}
                <div>
                    <Button className={filter === "all" ? "filter-button" : ""} title="All"
                            onClickHandler={() => changeTodoListFilter("all", todoListId)}/>
                    <Button className={filter === "active" ? "filter-button" : ""} title="Active"
                            onClickHandler={() => changeTodoListFilter("active", todoListId)}/>
                    <Button className={filter === "completed" ? "filter-button" : ""} title="Completed"
                            onClickHandler={() => changeTodoListFilter("completed", todoListId)}/>

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
