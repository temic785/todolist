import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    className?: string
    onChange: (newTitle: string) => void
}


export const EditableSpan = ({value, className,onChange}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");

    const activateEditModeHandler = () => {
        setEditMode(true);
        setTitle(value);
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    return (
        <>
            {editMode ?
                <input onChange={changeTitleHandler} value={title} onBlur={deactivateEditModeHandler} autoFocus/> :
                <span onDoubleClick={activateEditModeHandler} className={className}>{value}</span>}
        </>
    );
};