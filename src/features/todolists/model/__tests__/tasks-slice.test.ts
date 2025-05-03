import { beforeEach, expect, test } from "vitest"
import { createTask, deleteTask, tasksReducer, TasksState, updateTask } from "../tasks-slice"
import { createTodolist, deleteTodolist, FilterValues } from "@/features/todolists/model/todolists-slice.ts"
import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"
import { nanoid } from "@reduxjs/toolkit"


let startState: TasksState = {}

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0
}

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", status: TaskStatus.New, todoListId: "todolistId1", ...taskDefaultValues },
      { id: "2", title: "JS", status: TaskStatus.Completed, todoListId: "todolistId1", ...taskDefaultValues },
      { id: "3", title: "React", status: TaskStatus.New, todoListId: "todolistId1", ...taskDefaultValues }
    ],
    todolistId2: [
      { id: "1", title: "bread", status: TaskStatus.New, todoListId: "todolistId2", ...taskDefaultValues },
      { id: "2", title: "milk", status: TaskStatus.Completed, todoListId: "todolistId2", ...taskDefaultValues },
      { id: "3", title: "tea", status: TaskStatus.New, todoListId: "todolistId2", ...taskDefaultValues }
    ]
  }
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTask.fulfilled({ todolistId: "todolistId2", taskId: "2" }, "requestId", {
      todolistId: "todolistId2",
      taskId: "2"
    })
  )

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId1"
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId1"
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId1"
      }
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId2"
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId2"
      }
    ]
  })
})
test("correct task should be created at correct array", () => {
  const task = {
    id: nanoid(),
    title: "juice",
    status: TaskStatus.New,
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
    todoListId: "todolistId2"
  }
  const endState = tasksReducer(
    startState,
    createTask.fulfilled({ task }, "requestId", { todolistId: "todolistId2", title: "juice" })
  )

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe("juice")
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New)
})

test("correct task should change its status", () => {
  const task = {
    id: "2",
    title: "milk",
    status: TaskStatus.New,
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
    todoListId: "todolistId2"
  }
  const endState = tasksReducer(
    startState,
    updateTask.fulfilled({ task }, "requestId", {
      todolistId: "todolistId2",
      taskId: "2",
      domainModel: { status: TaskStatus.New }
    })
  )

  expect(endState.todolistId2[1].status).toBe(TaskStatus.New)
  expect(endState.todolistId1[1].status).toBe(TaskStatus.Completed)
})

test("correct task should change its title", () => {
  const task = {
    id: "2",
    title: "coffee",
    status: TaskStatus.Completed,
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
    todoListId: "todolistId2"
  }
  const endState = tasksReducer(
    startState,
    updateTask.fulfilled({ task }, "requestId", {
      todolistId: "todolistId2",
      taskId: "2",
      domainModel: { title: "coffee" }
    })
  )

  expect(endState.todolistId2[1].title).toBe("coffee")
  expect(endState.todolistId1[1].title).toBe("JS")
})

test("array should be created for new todolist", () => {
  const title = "New todolist"
  const todolist = { id: "todolistId3", title, addedDate: "", order: 0, filter: "all" as FilterValues }
  const endState = tasksReducer(startState, createTodolist.fulfilled({ todolist }, "requestId", title))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTodolist.fulfilled({ id: "todolistId2" }, "requestId", "todolistId2")
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})
