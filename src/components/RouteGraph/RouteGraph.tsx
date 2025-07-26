import { useDroppable } from '@dnd-kit/core';
import { ReactFlow, type Edge, type Node, type Connection, type NodeChange, type EdgeChange, Controls } from '@xyflow/react'
import { CustomGraphHeader } from '../CustomGraphHeader/CustomGraphHeader';

interface RouteGraphProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange[]) => void
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    notifySuccess: (content: string) => void;
}

export const RouteGraph = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, notifySuccess }: RouteGraphProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        wrapper: {
            position: 'relative',
            height: '100%',
            flexGrow: 1,
        },
        dropHere: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            background: 'aquamarine',
            opacity: 0.5,
        },
    }

    const route = edges.map((edge) => {
        return {
            from: edge.source,
            to: edge.target,
        }
    })

    return (
        <div ref={setNodeRef} style={style.wrapper as React.CSSProperties}>
            {isOver && <div style={style.dropHere as React.CSSProperties} />}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Controls />
                <CustomGraphHeader route={route} notifySuccess={notifySuccess} />
            </ReactFlow>
        </div>
    )
}
