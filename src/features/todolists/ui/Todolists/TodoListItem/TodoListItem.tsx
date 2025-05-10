import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodoListItem/TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/Tasks.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodoListItem/FilterButtons/FilterButtons.tsx"
import { createTask } from "@/features/todolists/model/tasks-slice.ts"
import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type TodoListPropsType = {
  todolist: DomainTodolist
}

export const TodoListItem = ({ todolist }: TodoListPropsType) => {
  const dispatch = useAppDispatch()

  const addTask = (taskTitle: string) => {
    dispatch(createTask({ todolistId: todolist.id, title: taskTitle }))
  }

  return (
    <div>
      <div>
        <TodolistTitle todolist={todolist} />
        <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
        <Tasks todolist={todolist} />
        <FilterButtons todolist={todolist} />
      </div>
    </div>
  )
}
