import React from "react";
import "./App.css";
import { Tasks } from "./Tasks";
import { title } from "process";
import { ArrLiPropsType, TodoList } from "./TodoList";

// Hi Guys!
// Let's reinforce our current session!
// -You have 2 arrays. You should create a new component TASKS, where you will render these arrays.
// -Don't forget to assign types to our data.

function App() {
  const data1 = {
    title: "What to do",
    tasks: [
      { taskId: 1, title: "HTML&CSS2", isDone: true },
      { taskId: 2, title: "JS2", isDone: true },
    ],
    students: [
      "Jago Wormald1",
      "Saul Milne2",
      "Aariz Hester3",
      "Dion Reeve4",
      "Anisa Ortega5",
      "Blade Cisneros6",
      "Malaikah Phelps7",
      "Zeeshan Gallagher8",
      "Isobella Vo9",
      "Rizwan Mathis10",
      "Menaal Leach11",
      "Kian Walton12",
      "Orion Lamb13",
      "Faizah Huynh14",
      "Crystal Vaughan15",
      "Vivien Hickman16",
      "Stuart Lu17",
      "Karol Davison18",
      "Dario Burns19",
      "Chloe Rich20",
      "Martyna Felix",
      "Nida Glass",
      "Maeve Miles",
      "Hasnain Puckett",
      "Ayman Cano",
      "Safwan Perry",
      "Fox Kelly",
      "Louise Barlow",
      "Malaki Mcgill",
      "Leanna Cline",
      "Willard Hodge",
      "Amelia Dorsey",
      "Kiah Porter",
      "Jeanne Daly",
      "Mohsin Armstrong",
      "Laurie Rangel",
      "Princess Tierney",
      "Kasim Kendall",
      "Darryl Cope",
      "Elysha Ray",
      "Liyana Harris",
      "Kashif Blackburn",
      "Atif Zimmerman",
      "Sila Hartley",
      "Ralphie Hebert",
    ],
  };
  const data2 = {
    title: "What to learn",
    tasks: [
      { taskId: 1, title: "HTML&CSS", isDone: true },
      { taskId: 2, title: "JS", isDone: true },
    ],
    students: [
      "Rick Kane",
      "Finnlay Bentley",
      "Samia North",
      "Isaac Morton",
      "Lily-Ann Clifford",
      "Thalia Park",
      "Sapphire Cruz",
      "Cieran Vazquez",
      "Anya Estes",
      "Dominika Field",
      "Rosanna Chung",
      "Safiyah Davey",
      "Ryley Beasley",
      "Kalvin Trejo",
      "Evie-Mae Farrell",
      "Juliet Valencia",
      "Astrid Austin",
      "Lyle Montgomery",
      "Nisha Mora",
      "Kylie Callaghan",
      "Star Wilks",
      "Marissa Colley",
      "Asa Fuller",
      "Leigh Kemp",
      "Avleen Dawson",
      "Sammy Bonilla",
      "Acacia Becker",
      "Coral Shepherd",
      "Melina Molina",
      "Kiran Bailey",
      "Clara Escobar",
      "Alexandru Horn",
      "Brandon-Lee Mercado",
      "Elouise Weston",
      "King Long",
      "Kerri Searle",
      "Kanye Hamer",
      "Elwood Benitez",
      "Mikail Whitaker",
      "Bobby Hardy",
      "Talha Ferry",
      "Priscilla Landry",
      "Olivia-Grace Cain",
      "Kiaan Wallace",
      "Wesley Padilla90",
      "Ella-Grace Wooten91",
      "Kaif Molloy92",
      "Kamal Broadhurst93",
      "Bianca Ferrell94",
      "Micheal Talbot95",
    ],
  };
  const tasks1: Array<ArrLiPropsType> = [
    { id: 1, title: "HTML&CSS", isActive: true },
    { id: 2, title: "JS", isActive: true },
    { id: 3, title: "React", isActive: false },
  ];
  const tasks2: Array<ArrLiPropsType> = [
    { id: 1, title: "Pizza", isActive: true },
    { id: 2, title: "Cola", isActive: false },
    { id: 3, title: "Eggs", isActive: false },
  ];
  const tasks3: Array<ArrLiPropsType> = [
    { id: 1, title: "Naruto", isActive: true },
    { id: 2, title: "One Piece", isActive: true },
    { id: 3, title: "Death Note", isActive: false },
  ];
  const tasks4: Array<ArrLiPropsType> = [];

  return (
    <div className="App">
      <Tasks data={data1} />
      <Tasks data={data2} />
      <TodoList arr={tasks1} titleH3="What to learn?" />
      <TodoList arr={tasks2} titleH3="What to eat?" />
      <TodoList arr={tasks3} titleH3="What to watch?" />
      <TodoList arr={tasks4} titleH3="What to watch?" />
    </div>
  );
}
export default App;
