import React, {useState} from "react";
import "./App.css";
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    title: string,
    id: string,
    filter: FilterValuesType,
    tasks: TaskType[];
}

export type TasksStateType = {
    [todoListId: string]: TaskType[];
}

function App() {


    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId_1,
            title: "What to learn?",
            filter: "all",
            tasks: []
        },
        {
            id: todoListId_2,
            title: "What to buy?",
            filter: "all",
            tasks: []
        }
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
            [todoListId_1]: [
                {id: v1(), title: "HTML&CSS", isActive: true},
                {id: v1(), title: "JS", isActive: true},
                {id: v1(), title: "React", isActive: false},
                {id: v1(), title: "TS", isActive: false},
                {id: v1(), title: "Redux", isActive: false},
            ],
            [todoListId_2]: [
                {id: v1(), title: "Beer", isActive: true},
                {id: v1(), title: "Cheeps", isActive: true},
                {id: v1(), title: "Cola", isActive: false},
                {id: v1(), title: "Fanta", isActive: false},
                {id: v1(), title: "Vodka", isActive: false},
            ],
        }
    )

    const addTask = (title: string, todoListId: string) => {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isActive: false,
        }
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]})
    }

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const setTaskNewStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isActive: isDone} : t)})
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }


    // const changeFilterValue = (newFilterValue: FilterValuesType, todoListId: string) => setFilter(newFilterValue)

    const changeTodoListFilter = (newFilterValue: FilterValuesType, todoListId: string) => setTodoLists(
        todoLists.map(tl => tl.id === todoListId ? {...tl, filter: newFilterValue} : tl)
    )

    // const tasks3: Array<ArrLiPropsType> = [
    //   { id: 1, title: "Naruto", isActive: true },
    //   { id: 2, title: "One Piece", isActive: true },
    //   { id: 3, title: "Death Note", isActive: false },
    // ];
    // const tasks4: Array<ArrLiPropsType> = [];

    return (
        <div className="App">

            {
                todoLists.map(tl => {

                    let filteredTasks: Array<TaskType> = tasks[tl.id]
                    if (tl.filter === "active") {
                        filteredTasks = filteredTasks.filter(t => t.isActive === false);
                    }
                    if (tl.filter === "completed") {
                        filteredTasks = filteredTasks.filter(t => t.isActive === true);
                    }


                    return (
                        <TodoList todoListId={tl.id}
                                  titleH3={tl.title}
                                  tasks={filteredTasks}
                                  filter={tl.filter}
                                  removeTask={removeTask}
                                  changeTodoListFilter={changeTodoListFilter}
                                  addTask={addTask}
                                  setTaskNewStatus={setTaskNewStatus}
                                  removeTodoList={removeTodoList}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
