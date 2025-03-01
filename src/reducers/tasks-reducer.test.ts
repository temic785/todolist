import {beforeEach, expect, test} from "vitest";
import {defineConfig} from "vitest/config";

import {TasksStateType} from "../app/App.tsx";
import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, tasksReducer, UpdateTaskNameAC} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodolistAC} from "./todolists-reducer";

export default defineConfig({
    test: {
        globals: true,  // Включает глобальные методы как test и expect
        environment: "node",  // Используем среду Node (или jsdom для браузерных тестов)
    },
});

let startState: TasksStateType = {}


beforeEach(() => {
    startState = {
        todolistId1: [
            {id: "1", title: "CSS", isActive: false},
            {id: "2", title: "JS", isActive: true},
            {id: "3", title: "React", isActive: false},
        ],
        todolistId2: [
            {id: "1", title: "bread", isActive: false},
            {id: "2", title: "milk", isActive: true},
            {id: "3", title: "tea", isActive: false},
        ],
    }
})

test("property with todolistId should be deleted", () => {
    const endState = tasksReducer(startState, RemoveTodolistAC("todolistId2"))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
    // or
    expect(endState["todolistId2"]).toBeUndefined()
})


test("array should be created for new todolist", () => {
    const endState = tasksReducer(startState, AddTodoListAC("New todolist"))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("New key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test("correct task should be deleted", () => {
    const endState = tasksReducer(
        startState,
        RemoveTaskAC({taskId: "2", todoListId: "todolistId2"})
    )

    expect(endState).toEqual({
        todolistId1: [
            {id: "1", title: "CSS", isActive: false},
            {id: "2", title: "JS", isActive: true},
            {id: "3", title: "React", isActive: false},
        ],
        todolistId2: [
            {id: "1", title: "bread", isActive: false},
            {id: "3", title: "tea", isActive: false},
        ],
    })
})


test("correct task should be created at correct array", () => {
    const endState = tasksReducer(
        startState,
        AddTaskAC({
            todoListId: "todolistId2",
            title: "juice",
        })
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe("juice")
    expect(endState.todolistId2[0].isActive).toBe(false)
})

test("correct task should change its status", () => {
    const endState = tasksReducer(
        startState,
        ChangeTaskStatusAC({todoListId: "todolistId2", taskId: "2", isActive: false})
    )

    expect(endState.todolistId2[1].isActive).toBe(false)
    expect(endState.todolistId1[1].isActive).toBe(true)
})
test("correct task should change its title", () => {
    const endState = tasksReducer(
        startState,
        UpdateTaskNameAC({todoListId: "todolistId2", taskId: "2", title: "New name"})
    )
    expect(endState.todolistId2[1].title).toBe("New name")
    expect(endState.todolistId1[1].title).toBe('JS')

})