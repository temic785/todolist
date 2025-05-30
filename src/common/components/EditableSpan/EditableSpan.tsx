import { ChangeEvent, useState } from "react"
import { Input } from "@mui/material"

type EditableSpanPropsType = {
  value: string
  className?: string
  onChange: (newTitle: string) => void
  disabled: boolean
}

export const EditableSpan = ({ value, className, onChange, disabled }: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState("")

  const activateEditModeHandler = () => {
    if (!disabled) {
      setEditMode(true)
      setTitle(value)
    }
  }

  const deactivateEditModeHandler = () => {
    setEditMode(false)
    onChange(title)
  }
  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return (
    <>
      {editMode ? (
        <Input onChange={changeTitleHandler} value={title} onBlur={deactivateEditModeHandler} autoFocus />
      ) : (
        <span onDoubleClick={activateEditModeHandler} className={className}>
          {value}
        </span>
      )}
    </>
  )
}
