import { Handle, Position } from "reactflow";
import { useAppDispatch } from "../../redux/store"
import { setSelectedTask, updateTaskTitle } from "../../redux/task/taskSlice";
import css from "./TaskNode.module.css"

export default function TaskNode({ id, data }: any) {
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(updateTaskTitle({ id, title: e.target.value}));
    }

    return(
        <div className={css.container} onClick={()=> dispatch(setSelectedTask(id))}>
            <Handle type="target" position={Position.Top}  className={css.handleHidden}/>
            <label className={css.label}>
                <input className={css.input}  value={data.label} onChange={handleChange}/>
            </label>
            <Handle type="source" position={Position.Bottom} className={css.handleHidden}/>
        </div>
    )
}