import { useDroppable } from '@dnd-kit/core';
import { ReactFlow, type Edge, type Node, type Connection, type NodeChange, type EdgeChange } from '@xyflow/react'

interface RouteGraphProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange[]) => void
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
}

export const RouteGraph = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect }: RouteGraphProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        backgroundColor: isOver ? 'green' : undefined,
        height: '100vh',
    };

    return (
        <div ref={setNodeRef} style={style}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
        </div>
    )
}
