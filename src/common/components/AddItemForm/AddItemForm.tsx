import  {ChangeEvent, KeyboardEvent, useState} from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {IconButton, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void,
}


export const AddItemForm = ({addItem}: AddItemFormPropsType) => {

    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState(false);

    const isTitleLengthValid = itemTitle.length <= 15


    const onKeyDownAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemHandler();
        }
    }
    const addItemHandler = () => {
        const croppedTaskTitle = itemTitle.trim();
        if (croppedTaskTitle && isTitleLengthValid) {
            addItem(croppedTaskTitle);
            setItemTitle("");

        } else {
            setError(true);
            setItemTitle("");
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setItemTitle(event.target.value)
    }

    return (
        <div>
            <TextField variant="outlined" onKeyDown={onKeyDownAddItemHandler} label={"max 15 characters"}
                       size={"small"}
                       value={itemTitle}
                       onChange={changeItemTitleHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton disabled={!isTitleLengthValid} onClick={addItemHandler}>
                <AddBoxIcon>+</AddBoxIcon>
            </IconButton>
            {!isTitleLengthValid && <div style={{color: "red"}}>Max length title is 15 characters</div>}
            {error && <div style={{color: "red"}} color={"red"}>Title is required!!!</div>}
        </div>
    );
};