import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodoListItem/TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/Tasks.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodoListItem/FilterButtons/FilterButtons.tsx"
import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type TodoListPropsType = {
  todolist: DomainTodolist
}

export const TodoListItem = ({ todolist }: TodoListPropsType) => {
  const [createTask] = useCreateTaskMutation()
  const addTask = (taskTitle: string) => {
    createTask({ todoListId: todolist.id, taskTitle })
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
