
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
import 'reactflow/dist/style.css';

const nodeTypes  = {taskNode: TaskNode}

export default function FlowCanvas() {
    const dispatch = useAppDispatch();
    const {tasks, edges} = useAppSelector((state) => state.tasks);
;
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
            setLocalEdges((eds) => {
                const updated = applyEdgeChanges(changes, eds);
                dispatch(updateEdges(updated));
                return updated;
            });
        },
        [dispatch]
    );

    const onConnect = useCallback(
        (params: Edge<any> | Connection) => {
            const updatedEdges = addEdge(params, localEdges);
            setLocalEdges(updatedEdges); 
            dispatch(updateEdges(updatedEdges));
          },
          [localEdges, dispatch]
    );

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
            edges={localEdges}
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