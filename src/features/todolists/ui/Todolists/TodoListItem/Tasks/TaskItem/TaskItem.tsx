import {Box, IconButton, ListItem} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeTaskStatusAC, RemoveTaskAC, UpdateTaskNameAC} from "@/features/todolists/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TaskType} from "@/features/todolists/ui/Todolists/TodoListItem/TodoListItem.tsx";
import {getListItemSx} from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.styles.ts";
import styles from "./TaskItem.module.css"

type Props = {
    task: TaskType
    todoListId: string
};

export const TaskItem = ({task,todoListId}: Props) => {
    const dispatch = useAppDispatch();

    const removeTask = () =>
        dispatch(RemoveTaskAC({taskId: task.id,  todoListId}));

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            ChangeTaskStatusAC({
                taskId: task.id,
                isActive: e.currentTarget.checked,
                todoListId,
            })
        );
    };

    const updateTask = (title: string) => {
        dispatch(UpdateTaskNameAC({taskId: task.id, todoListId, title}));
    };

    return (
        <div>
            <ListItem disablePadding sx={getListItemSx(task.isActive)}>
                <Box>
                    <Checkbox size="small" checked={task.isActive} onChange={changeTaskStatus}/>
                    <EditableSpan
                        value={task.title}
                        className={task.isActive ? styles.taskActive : styles.task}
                        onChange={updateTask}
                    />
                </Box>
                <IconButton aria-label="delete" onClick={removeTask}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        </div>
    );
};