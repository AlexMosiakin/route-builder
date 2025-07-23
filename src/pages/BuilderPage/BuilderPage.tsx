import { Spin } from "antd";
import { useGetCountries } from "../../services/countries/useGetCountires";
import { useCallback } from "react";
import { addEdge, Background, MarkerType, ReactFlow, useEdgesState, useNodesState, type Connection, type Edge, type EdgeTypes, type Node, type NodeTypes } from "@xyflow/react";
import CustomConnectionLine from "../../components/CustomConnectionLine/CustomConnectionLine";
import CustomNode from "../../components/CustomNode/CustomNode";
import FloatingEdge from "../../components/FloatingEdge/FloatingEdge";
import '@xyflow/react/dist/style.css';

interface Country {
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            }
        }
    },
    flag: string;
}

const connectionLineStyle = {
    stroke: '#b1b1b7',
};

const nodeTypes = {
    custom: CustomNode,
};

const edgeTypes = {
    floating: FloatingEdge,
};

const defaultEdgeOptions = {
    type: 'floating',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#b1b1b7',
    },
};

export const BuilderPage = () => {
    const { countries, isCountriesLoading } = useGetCountries();
    const topTenCountries: Country[] = Array.isArray(countries) ? countries.slice(0, 5) : [];

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    if (isCountriesLoading) {
        return <Spin size="large" />
    }

    console.log(nodes);

    return (
        <div>
            <h1>BuilderPage</h1>
            <div style={{ width: '100%', height: '100vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={() => {
                        setNodes(topTenCountries?.map((country, index) => ({
                            id: country.name.common,
                            position: { x: index * 200, y: 0 },
                            type: 'custom',
                            data: { 
                                name: country.name.common,
                                flag: country.flag,
                            }
                        })));
                    }}
                    fitView
                    nodeTypes={nodeTypes as NodeTypes}
                    edgeTypes={edgeTypes as EdgeTypes}
                    defaultEdgeOptions={defaultEdgeOptions}
                    connectionLineComponent={(props) => <CustomConnectionLine {...props} connectionLineStyle={connectionLineStyle} />}
                >
                    <Background />
                </ReactFlow>
            </div>
        </div>
    )
}
