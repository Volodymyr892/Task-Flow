
import TaskNode from "../TaskNode/TaskNode"
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ReactFlow, { 
    addEdge, 
    applyNodeChanges, 
    Connection, 
    Edge,  
    Node, 
    NodeChange, 
    EdgeChange,

    applyEdgeChanges} from "reactflow";
import { useCallback, useEffect, useState } from "react";
import { setSelectedTask, updateEdges, updatePosition } from "../../redux/task/taskSlice";
import css from "./FlowCanvas.module.css"

const nodeTypes  = {taskNode: TaskNode}

export default function FlowCanvas() {
    const dispatch = useAppDispatch();
    const {tasks, edges} = useAppSelector((state) => state.tasks);
    // console.log("🚀 ~ FlowCanvas ~ tasks:", tasks)

    const uniqueTasks = tasks.filter((task, index, self) =>
        index === self.findIndex(t => t.id === task.id)
    );
    const [nodes, setNodes] = useState<Node[]>([]); 

    const [localEdges, setLocalEdges] = useState<Edge[]>(edges); 
  
    useEffect(() => {
      setNodes(tasks);
    }, [tasks]);
  
    useEffect(() => {
      setLocalEdges(edges);
    }, [edges]);
  
    const onNodesChange = useCallback(
      (changes: NodeChange[]) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
      },
      []
    );
  
    const onEdgesChange = useCallback(
      (changes: EdgeChange[]) => {
        setLocalEdges((eds) => applyEdgeChanges(changes, eds));
      },
      []
    );

    const onConnect = useCallback(
        (params: Edge<any> | Connection)=>
            dispatch(updateEdges(addEdge(params, localEdges))
    ),[localEdges,dispatch])

    const onNodeDragStop = useCallback((_:any, node: Node)=>{
        dispatch(updatePosition({id: node.id, position: node.position}))
    },[dispatch])

    const onNodeClick = (_: any, node: Node)=>{
        dispatch(setSelectedTask(node.id));
    }
    
    return(
        <div className={css.container}>
            <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeDragStop={onNodeDragStop}
            onNodeClick={onNodeClick}
            fitView
            >
                
            </ReactFlow>
        </div>
    )
}