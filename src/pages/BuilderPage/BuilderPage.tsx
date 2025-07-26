import { useCallback, useState } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges, type Connection, type Edge, type EdgeChange, type Node, type NodeChange } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { AddCountryNodePanel } from "../../components/AddCountryNodePanel/AddCountryNodePanel";
import type { Country } from "../../domain/country";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { RouteGraph } from "../../components/RouteGraph/RouteGraph";
import restrictions from '../../mocks/restrictions.json'
import { message } from "antd";

export const BuilderPage = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const notifySuccess = useCallback((content: string) => {
        messageApi.success(content);
    }, [messageApi]);

    const notifyError = useCallback((content: string) => {
        messageApi.error(content);
    }, [messageApi]);

    const style = {
        wrapper: {
            display: 'flex',
            flexDirection: 'row',
            height: '100vh',
        },
    }

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) => {
            const isLoop = edges.some((edge) => edge.source === params.target) || params.source === params.target
            const isRestricted = restrictions.some((restriction) => restriction.from === params.source && restriction.to === params.target)
            if (!isLoop && !isRestricted) {
                setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot))
            } else {
                if (isLoop) {
                    notifyError('You cannot add a loop to the graph')
                } else {
                    notifyError('You cannot add a route that is restricted')
                }
            }
        },
        [edges, notifyError],
    );

    const onAddCountryNode = useCallback(
        (country: Country) => {
            setNodes((nodesSnapshot) => {
                const lastNode = nodesSnapshot.length > 0 ? nodesSnapshot[nodesSnapshot.length - 1] : null;
                const newNode: Node = {
                    id: country.name.common,
                    position: { x: (lastNode?.position?.x ?? 0) + 170, y: 0 },
                    data: {
                        label: <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>{country.flag}</span>
                            <span>{country.name.common}</span>
                        </div>
                    },
                };
                return [...nodesSnapshot, newNode];
            });
        },
        [],
    );


    function handleDragEnd(event: DragEndEvent) {
        const isOver = event.over && event.over.id === 'droppable'
        if (isOver) {
            onAddCountryNode(event.active.data.current?.country);
        }
    }


    return (
        <DndContext onDragEnd={handleDragEnd}>
            {contextHolder}
            <div style={style.wrapper as React.CSSProperties}>
                <RouteGraph nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} notifySuccess={notifySuccess} />
                <AddCountryNodePanel nodes={nodes} onAddCountryNode={onAddCountryNode} />
            </div>
        </DndContext>
    )
}
