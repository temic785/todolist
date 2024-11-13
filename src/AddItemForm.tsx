import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void,
}


export const AddItemForm = ({addItem}:AddItemFormPropsType) => {

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
            <input onKeyDown={onKeyDownAddItemHandler} placeholder={"max 15 characters"} value={itemTitle}
                   onChange={changeItemTitleHandler}
                   className={error ? "error-input" : ""}
            />
            <Button disabled={!isTitleLengthValid} onClickHandler={addItemHandler} title="+"/>
            {!isTitleLengthValid && <div style={{color: "red"}}>Max length title is 15 characters</div>}
            {error && <div style={{color: "red"}} color={"red"}>Title is required!!!</div>}
        </div>
    );
};