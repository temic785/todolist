// @ts-ignore
import { beforeEach, expect, test } from 'vitest';
import { defineConfig } from 'vitest/config';

import {TasksStateType} from "../app/App.tsx";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC} from "./todolists-reducer";
import {v1} from "uuid";

export default defineConfig({
    test: {
        globals: true,  // Включает глобальные методы как test и expect
        environment: 'node',  // Используем среду Node (или jsdom для браузерных тестов)
    },
});

let startState: TasksStateType = {}

const todolistId = v1()

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: "1", title: "CSS", isActive: false},
            {id: "2", title: "JS", isActive: true},
            {id: "3", title: "React", isActive: false},
        ],
        todoListId2: [
            {id: "1", title: "bread", isActive: false},
            {id: "2", title: "milk", isActive: true},
            {id: "3", title: "tea", isActive: false},
        ],
    }
})

test("array should be created for new todolist", () => {
    const endState = tasksReducer(startState, AddTodoListAC("New todolist",todolistId));

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("New key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

// test('property with todolistId should be deleted', () => {
//     const endState = tasksReducer(startState, RemoveTodolistAC('todolistId2'))
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).not.toBeDefined()
//     // or
//     expect(endState['todolistId2']).toBeUndefined()
// })