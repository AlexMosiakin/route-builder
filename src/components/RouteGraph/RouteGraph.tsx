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
        wrapper: {
            position: 'relative',
            height: '100%',
            width: '100%',
        },
        dropHere: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            background: 'aquamarine',
        },
    }

    return (
        <div ref={setNodeRef} style={style.wrapper as React.CSSProperties}>
            {isOver && <div style={style.dropHere as React.CSSProperties}>drop here</div>}
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
