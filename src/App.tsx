import React, {useState} from "react";
import "./App.css";
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import {Box, Container, createTheme, CssBaseline, Grid, Grid2, Paper, Switch, ThemeProvider} from "@mui/material";
import {filterButtonsContainerSx} from "./Todolist.style";
import {MenuButton} from "./MenuButton";
import {deepPurple, green} from "@mui/material/colors";

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    title: string,
    id: string,
    filter: FilterValuesType,
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
        },
        {
            id: todoListId_2,
            title: "What to buy?",
            filter: "all",
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

    //task
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

    //todolist

    const addTodoList = (title: string) => {
        const todoListId = v1()
        const newTodoList: TodoListType = {
            id: todoListId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todoListId]: []})
    }

    const changeTodoListFilter = (newFilterValue: FilterValuesType, todoListId: string) => setTodoLists(
        todoLists.map(tl => tl.id === todoListId ? {...tl, filter: newFilterValue} : tl)
    )

    const updateTodoList = (todoListId: string, title: string) => {
        setTodoLists(todoLists.map(tl => (tl.id === todoListId ? {...tl, title: title} : tl)))
    }
    const updateTask = (todoListId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(tasks => tasks.id === taskId ? {...tasks, title} : tasks)
        })
    }
    const [isDark, setIsDark] = useState<boolean>(false)

    const theme = createTheme({
        palette: {
            primary: green,
            secondary: {
                main: "#673ab7",
            },
            mode: isDark ? "dark" : "light"
        },
    })

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar sx={filterButtonsContainerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Box>
                            <MenuButton variant={"outlined"} color="inherit">Login</MenuButton>
                            <MenuButton variant={"outlined"} color="inherit">Logout</MenuButton>
                            <MenuButton background={"grey"} variant={"outlined"} color="inherit">FAQ</MenuButton>
                            <Switch onChange={() => setIsDark(!isDark)}/>

                        </Box>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid2 sx={{p: "10px 15px"}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid2>
                    <Grid2 container spacing={4}>
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
                                    <Grid2>
                                        <Paper elevation={4} sx={{p: "20px"}}>
                                            <TodoList
                                                key={tl.id}
                                                todoListId={tl.id}
                                                titleH3={tl.title}
                                                tasks={filteredTasks}
                                                filter={tl.filter}
                                                removeTask={removeTask}
                                                changeTodoListFilter={changeTodoListFilter}
                                                addTask={addTask}
                                                setTaskNewStatus={setTaskNewStatus}
                                                removeTodoList={removeTodoList}
                                                updateTodoList={updateTodoList}
                                                updateTask={updateTask}
                                            />
                                        </Paper>
                                    </Grid2>


                                )
                            })
                        }
                    </Grid2>

                </Container>
            </ThemeProvider>


        </div>
    );
}

export default App;
