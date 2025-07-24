import { Splitter } from "antd";
import { useCallback, useState } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges, type Connection, type Edge, type EdgeChange, type Node, type NodeChange } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { AddCountryNodePanel } from "../../components/AddCountryNodePanel/AddCountryNodePanel";
import type { Country } from "../../domain/country";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { RouteGraph } from "../../components/RouteGraph/RouteGraph";

export const BuilderPage = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const onAddCountryNode = useCallback(
        (country: Country) => {
            setNodes((nodesSnapshot) => {
                const newNode: Node = {
                    id: country.name.common,
                    position: { x: 0, y: 0 },
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
        if (event.over && event.over.id === 'droppable') {
            onAddCountryNode(event.active.data.current?.country);
        }
    }


    return (
        <DndContext onDragEnd={handleDragEnd}>
            <Splitter>
                <Splitter.Panel defaultSize="70%" min="20%" max="70%">
                    <RouteGraph nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} />
                </Splitter.Panel>
                <Splitter.Panel>
                    <AddCountryNodePanel onAddCountryNode={onAddCountryNode} />
                </Splitter.Panel>
            </Splitter>
        </DndContext>
    )
}
