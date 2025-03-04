import {useState} from "react";
import "./App.css";
import MenuIcon from "@mui/icons-material/Menu";
import {AddItemForm} from "../AddItemForm.tsx";
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import {Box, Container, createTheme, CssBaseline, Grid2, Paper, Switch, ThemeProvider} from "@mui/material";
import {filterButtonsContainerSx} from "../Todolist.style.ts";
import {MenuButton} from "../MenuButton.tsx";
import {green} from "@mui/material/colors";
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "../model/todolists-reducer.ts";
import {TaskType, TodoList} from "../TodoList.tsx";
import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, UpdateTaskNameAC} from "../model/tasks-reducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    title: string,
    id: string,
    filter: FilterValuesType,
}

export type TasksStateType = {
    [todoListId: string]: TaskType[];
}

export const App = () => {


    const todoLists = useAppSelector(selectTodolists)
    let tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    // const [todoLists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
    //     {id: todoListId_1, title: "What to learn?", filter: "all",},
    //     {id: todoListId_2, title: "What to buy?", filter: "all",}
    // ])

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

    //task
    const addTask = (title: string, todoListId: string) => {
        dispatch(AddTaskAC(title, todoListId))
    }

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(RemoveTaskAC({taskId: taskId, todoListId: todoListId}))
    }

    const setTaskNewStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(ChangeTaskStatusAC({taskId: taskId, isActive: isDone, todoListId: todoListId}))
    }

    const updateTask = (todoListId: string, taskId: string, title: string) => {
        dispatch(UpdateTaskNameAC({taskId: taskId, todoListId: todoListId, title: title}))
    }

    //todolist

    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }

    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodolistAC({id: todoListId})
        dispatch(action)
    }

    const changeTodoListFilter = (newFilterValue: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC({todoListId: todoListId, filter: newFilterValue}))
    }

    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC({todoListId: todoListId, title: title}))
    }

    const [isDark, setIsDark] = useState<boolean>(true)

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
                                                updateTodoList={changeTodoListTitle}
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
