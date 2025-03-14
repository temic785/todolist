import {TodoListType} from "../../../../../app/App.tsx";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm.tsx";
import {AddTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodoListItem/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodoListItem/FilterButtons/FilterButtons.tsx";

export type TaskType = {
    id: string;
    title: string;
    isActive: boolean;
};


type TodoListPropsType = {
    todolist: TodoListType
};

export const TodoListItem = ({todolist}: TodoListPropsType) => {
    const dispatch = useAppDispatch()


    const addTask = (taskTitle: string) => {
        dispatch(AddTaskAC(taskTitle, todolist.id))
    }


    return (
        <div>
            <div>
                <TodolistTitle todolist={todolist}/>
                <AddItemForm addItem={addTask}/>
                <Tasks todolist={todolist}/>
                <FilterButtons todolist={todolist}/>
            </div>
        </div>
    )
}

