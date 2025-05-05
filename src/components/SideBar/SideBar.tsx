import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateTaskTitle } from "../../redux/task/taskSlice";
import AddButton from "../AddButton/AddButton";
import css from "./SideBar.module.css"

export default function  SideBar() {
    const dispatch = useAppDispatch();

    const selectedTask= useAppSelector(state => 
        state.tasks.tasks.find(task => task.id === state.tasks.selectedTaskId)
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(selectedTask) {
            dispatch(updateTaskTitle({id: selectedTask.id, title: e.target.value}));
        }
    }
    return(
        <div className={css.container}>
            <AddButton/>
            {selectedTask && (
                <div className={css.containerEdit}>
                    <h3 className={css.title}> Edit Task</h3>
                    <div>
                        <label className={css.label}>
                            <input
                            className={css.input}
                            type="text"
                            value={selectedTask.data.label}
                            onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    )
}