import { useDispatch } from "react-redux"
import { addTask } from "../../redux/task/taskSlice";
import css from "./AddButton.module.css"

export default function AddButton() {
    const dispatch = useDispatch();
    return (
        <button className={css.button}  onClick={()=>dispatch(addTask())}>
            Add Task
        </button>
    )
}
