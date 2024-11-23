import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from "@mui/material/Button"
import {Box, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.style";

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
                         }: TodoListPopsType,) => {


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
                    <ListItem
                        key={arr.id}
                        disablePadding
                        sx={getListItemSx(arr.isActive)}
                    >
                        <Box>
                            <Checkbox size={"small"} checked={arr.isActive} onChange={setTaskNewStatusHandler}/>
                            <EditableSpan value={arr.title} className={arr.isActive ? "task-done" : "task"}
                                          onChange={updateTaskHandler}/>
                        </Box>

                        <IconButton aria-label="delete" onClick={removeTaskHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                );
            }
        )
    ;

    return (
        <div>
            <div>
                <Typography align={"center"} variant={"h6"} sx={{fontWeight: "bold"}}>
                    <EditableSpan value={titleH3} onChange={updateTodoListHandler}/>
                    <IconButton onClick={() => removeTodoList(todoListId)}>
                        <DeleteIcon/>
                    </IconButton>
                </Typography>

                <AddItemForm addItem={addTaskHandler}/>

                {tasks.length === 0 ? (
                    <p>your tasks were not found</p>
                ) : (
                    <List>{taskList}</List>
                )}
                <Box sx={filterButtonsContainerSx}>
                    <Button
                        size="small"
                        variant="contained"
                        color={filter === "all" ? "secondary" : "primary"}
                        // className={filter === "all" ? "filter-button" : ""}
                        onClick={() => changeTodoListFilter("all", todoListId)}
                    >All</Button>
                    <Button
                        size="small"
                        variant="contained"
                        color={filter === "active" ? "secondary" : "primary"}
                        onClick={() => changeTodoListFilter("active", todoListId)}
                    >Active
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color={filter === "completed" ? "secondary" : "primary"}
                        onClick={() => changeTodoListFilter("completed", todoListId)}
                    >Completed</Button>

                </Box>
            </div>
        </div>
    );
};

