import {FilterValuesType, TodoListType} from "@/app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

// const [todoLists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
//     {id: nanoid(), title: "What to learn?", filter: "all",},
//     {id: nanoid(), title: "What to buy?", filter: "all",}
// ])
//
// let [tasks, dispatchTaskReducer] = useReducer(tasksReducer, {
//         [todoListId_1]: [
//             {id: v1(), title: "HTML&CSS", isActive: true},
//             {id: v1(), title: "JS", isActive: true},
//             {id: v1(), title: "React", isActive: false},
//             {id: v1(), title: "TS", isActive: false},
//             {id: v1(), title: "Redux", isActive: false},
//         ],
//         [todoListId_2]: [
//             {id: v1(), title: "Beer", isActive: true},
//             {id: v1(), title: "Cheeps", isActive: true},
//             {id: v1(), title: "Cola", isActive: false},
//             {id: v1(), title: "Fanta", isActive: false},
//             {id: v1(), title: "Vodka", isActive: false},
//         ],
//     }
// )


const initialState: TodoListType[] = []

//Action creators
export const RemoveTodolistAC = createAction<{ id: string }>("todolists/removeTodolist")


export const AddTodoListAC = createAction("todolists/addTodoList", (title: string) => {
    return {payload: {id: nanoid(), title}}
})

export const ChangeTodolistTitleAC = createAction<{
    todoListId: string,
    title: string
}>("todolists/changeTodolistTitle")

export const ChangeTodolistFilterAC = createAction<{
    todoListId: string,
    filter: FilterValuesType
}>("todolists/changeTodolistFilter")


export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(RemoveTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1);
            }
        })
        .addCase(AddTodoListAC, (state, action) => {
            state.push({...action.payload, filter: "all"})
        })
        .addCase(ChangeTodolistTitleAC, (state, action) => {
           const index= state.findIndex(todolist => todolist.id === action.payload.todoListId)
            if(index!==-1){
                state[index].title = action.payload.title

            }
        })
        .addCase(ChangeTodolistFilterAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todoListId)
            if (index !== -1) {
                state[index].filter = action.payload.filter
            }
        })
})







