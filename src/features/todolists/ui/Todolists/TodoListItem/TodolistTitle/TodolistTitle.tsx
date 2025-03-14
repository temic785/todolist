import {IconButton, Typography} from "@mui/material";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeTodolistTitleAC, RemoveTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodoListType} from "@/app/App.tsx";

type Props = {
    todolist: TodoListType

};

export const TodolistTitle = ({todolist: {title, id}}: Props) => {

    const dispatch = useAppDispatch()


    const changeTodolistTitle = (title: string) => {
        dispatch(ChangeTodolistTitleAC({todoListId: id, title: title}))
    }

    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodolistAC({id: todoListId})
        dispatch(action)
    }
    return (
        <Typography align={"center"} variant={"h6"} sx={{fontWeight: "bold"}}>
            <EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={() => removeTodoList(id)}>
                <DeleteIcon/>
            </IconButton>
        </Typography>
    );
};