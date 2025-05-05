import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge } from "reactflow";

import { v4 as uuidv4 } from "uuid";

interface Task {
    id: string;
    position: {x: number; y: number};
    data: {label: string};
    type: "taskNode";
}
interface TaskState {
    tasks: Task[];
    edges: Edge[];
    selectedTaskId: string | null;
}

const initialState: TaskState= {
    tasks: [],
    edges: [],
    selectedTaskId: null,
};

export const tasksSlice = createSlice({
    name: "task", 
    initialState,
    reducers: {
        addTask: (state)=>{
            const id = uuidv4();
            state.tasks.push({
                id,
                position: {x: 100, y: 100 },
                type: "taskNode",
                data: {label: `Task ${id}`},
            });
        },
        updateTaskTitle: (state, action: PayloadAction<{id: string; title: string}>)=>{
            const task = state.tasks.find((task)=>task.id === action.payload.id);
            if (task) task.data.label = action.payload.title; 
        },
        updateEdges: (state, action: PayloadAction<Edge[]>)=>{
            state.edges = action.payload;
        },
        updatePosition:(state, action: PayloadAction<{id: string; position: {x: number; y: number}}>)=>{
            const task = state.tasks.find((task)=>task.id ===action.payload.id)
            if (task) task.position = action.payload.position;
        },
        setSelectedTask: (state, action: PayloadAction<string>)=>{
            state.selectedTaskId = action.payload;
        },
        resetTasks: (state) => {
            state.tasks = [];
            state.edges = [];
            state.selectedTaskId = null;
        }
    }
});

export const {
    addTask,
    updateTaskTitle,
    updateEdges,
    updatePosition,
    setSelectedTask,
    resetTasks,
}= tasksSlice.actions;

export const taskReducer = tasksSlice.reducer;