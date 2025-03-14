import {Container, Grid2} from "@mui/material";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import {AddTodoListAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";

export const Main = () => {

    const dispatch = useAppDispatch()

    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }

    return (
        <Container>
            <Grid2 sx={{p: "10px 15px"}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid2>
            <Grid2 container spacing={4}>
                <Todolists/>
            </Grid2>

        </Container>

    );
};