import React, {useState} from "react";
import "./App.css";
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    // const data1 = {
    //   title: "What to do",
    //   tasks: [
    //     { taskId: 1, title: "HTML&CSS2", isDone: true },
    //     { taskId: 2, title: "JS2", isDone: true },
    //   ],
    //   students: [
    //     "Jago Wormald1",
    //     "Saul Milne2",
    //     "Aariz Hester3",
    //     "Dion Reeve4",
    //     "Anisa Ortega5",
    //     "Blade Cisneros6",
    //     "Malaikah Phelps7",
    //     "Zeeshan Gallagher8",
    //     "Isobella Vo9",
    //     "Rizwan Mathis10",
    //     "Menaal Leach11",
    //     "Kian Walton12",
    //     "Orion Lamb13",
    //     "Faizah Huynh14",
    //     "Crystal Vaughan15",
    //     "Vivien Hickman16",
    //     "Stuart Lu17",
    //     "Karol Davison18",
    //     "Dario Burns19",
    //     "Chloe Rich20",
    //     "Martyna Felix",
    //     "Nida Glass",
    //     "Maeve Miles",
    //     "Hasnain Puckett",
    //     "Ayman Cano",
    //     "Safwan Perry",
    //     "Fox Kelly",
    //     "Louise Barlow",
    //     "Malaki Mcgill",
    //     "Leanna Cline",
    //     "Willard Hodge",
    //     "Amelia Dorsey",
    //     "Kiah Porter",
    //     "Jeanne Daly",
    //     "Mohsin Armstrong",
    //     "Laurie Rangel",
    //     "Princess Tierney",
    //     "Kasim Kendall",
    //     "Darryl Cope",
    //     "Elysha Ray",
    //     "Liyana Harris",
    //     "Kashif Blackburn",
    //     "Atif Zimmerman",
    //     "Sila Hartley",
    //     "Ralphie Hebert",
    //   ],
    // };
    // const data2 = {
    //   title: "What to learn",
    //   tasks: [
    //     { taskId: 1, title: "HTML&CSS", isDone: true },
    //     { taskId: 2, title: "JS", isDone: true },
    //   ],
    //   students: [
    //     "Rick Kane",
    //     "Finnlay Bentley",
    //     "Samia North",
    //     "Isaac Morton",
    //     "Lily-Ann Clifford",
    //     "Thalia Park",
    //     "Sapphire Cruz",
    //     "Cieran Vazquez",
    //     "Anya Estes",
    //     "Dominika Field",
    //     "Rosanna Chung",
    //     "Safiyah Davey",
    //     "Ryley Beasley",
    //     "Kalvin Trejo",
    //     "Evie-Mae Farrell",
    //     "Juliet Valencia",
    //     "Astrid Austin",
    //     "Lyle Montgomery",
    //     "Nisha Mora",
    //     "Kylie Callaghan",
    //     "Star Wilks",
    //     "Marissa Colley",
    //     "Asa Fuller",
    //     "Leigh Kemp",
    //     "Avleen Dawson",
    //     "Sammy Bonilla",
    //     "Acacia Becker",
    //     "Coral Shepherd",
    //     "Melina Molina",
    //     "Kiran Bailey",
    //     "Clara Escobar",
    //     "Alexandru Horn",
    //     "Brandon-Lee Mercado",
    //     "Elouise Weston",
    //     "King Long",
    //     "Kerri Searle",
    //     "Kanye Hamer",
    //     "Elwood Benitez",
    //     "Mikail Whitaker",
    //     "Bobby Hardy",
    //     "Talha Ferry",
    //     "Priscilla Landry",
    //     "Olivia-Grace Cain",
    //     "Kiaan Wallace",
    //     "Wesley Padilla90",
    //     "Ella-Grace Wooten91",
    //     "Kaif Molloy92",
    //     "Kamal Broadhurst93",
    //     "Bianca Ferrell94",
    //     "Micheal Talbot95",
    //   ],
    // };
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isActive: true},
        {id: v1(), title: "JS", isActive: true},
        {id: v1(), title: "React", isActive: false},
    ]);
    const removeTask = (taskId: string) => {
        const filterTasks = tasks.filter(t => {
            return t.id !== taskId;
        })
        setTasks(filterTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodoList: Array<TaskType> = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isActive === false);
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isActive === true);
    }

    const changeFilterValue = (newFilterValue: FilterValuesType) => setFilter(newFilterValue)


    const addTask = (title:string) => {
        console.log(title)
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isActive: false,
        }
        const newState = [...tasks,newTask]
        setTasks(newState)
    }

    // let [tasks2, setTasks] = useState<TasksTypePractice[]>([
    //     {id: 1, title: "Pizza", isActive: true},
    //     {id: 2, title: "Cola", isActive: false},
    //     {id: 3, title: "Eggs", isActive: false},
    // ]);
    //
    // const removeTask = (taskId: number) => {
    //     const filterTasks = tasks2.filter(tasks2 => {
    //         return tasks2.id !== taskId
    //     })
    //     setTasks(filterTasks);
    // }

    // const tasks3: Array<ArrLiPropsType> = [
    //   { id: 1, title: "Naruto", isActive: true },
    //   { id: 2, title: "One Piece", isActive: true },
    //   { id: 3, title: "Death Note", isActive: false },
    // ];
    // const tasks4: Array<ArrLiPropsType> = [];

    return (
        <div className="App">
            {/*<Tasks data={data1} />*/}
            {/*<Tasks data={data2} />*/}
            <TodoList arr={tasksForTodoList} titleH3="What to learn?" removeTask={removeTask} changeFilter={changeFilterValue} addTask={addTask}/>
            {/*<TodoListPractice tasks={tasks2} titleH3={"What to eat?"} removeTask={removeTask}/>*/}
            {/*<TodoList arr={tasks2} titleH3="What to eat?" />*/}
            {/*<TodoList arr={tasks3} titleH3="What to watch?" />*/}
            {/*<TodoList arr={tasks4} titleH3="What to watch?" />*/}

        </div>
    );
}

export default App;
