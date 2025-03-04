import {AddTodoListAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer} from "./todolists-reducer.ts"
import {TodoListType} from "../app/App.tsx";
import {expect, test} from "vitest";
import {nanoid} from "@reduxjs/toolkit";

test("correct todolist should be removed", () => {
    let todolistId1 = nanoid()
    let todolistId2 = nanoid()

    // 1. Стартовый state
    const startState: TodoListType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC({id: todolistId1}))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    let todolistId1 = nanoid()
    let todolistId2 = nanoid()

    const startState: TodoListType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const newTitle = "New Todolist"
    const endState = todolistsReducer(startState, AddTodoListAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test("correct todolist should change its name", () => {
    let todolistId1 = nanoid()
    let todolistId2 = nanoid()

    const startState: TodoListType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]
    const newTitle = "New Todolist"

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTitle)
})

test("correct filter of todolist should be changed", () => {
    let todolistId1 = nanoid()
    let todolistId2 = nanoid()

    const startState: TodoListType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const newFilter = "all"
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})

