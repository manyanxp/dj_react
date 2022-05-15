/* eslint-disable import/first */
import { useState, useEffect, MouseEvent } from 'react';
import { ChangeEvent } from 'react';

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Node,
  ReactFlowInstance,
  Position,
  SnapGrid,
  Connection,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

import RootElementNode, {EntitiesElementNode, VehicleElementNode, SimpleElementNode} from './packages/customs/MyElementNode';

import createOpenScenarioNodes, { getXML } from './ReadXML';

const element: any = createOpenScenarioNodes();
const onInit = (reactFlowInstance: ReactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);

  reactFlowInstance.fitView();
};
const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
const onNodeClick = (_: MouseEvent, node: Node) => console.log('click', node);

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid: SnapGrid = [16, 16];

const nodeTypes = {
  xmlNode: RootElementNode,
  entitieseNode: EntitiesElementNode,
  vehicleNode: VehicleElementNode,
  simpleNode:SimpleElementNode
};


const xml: string = `<?xml version="1.0" encoding="UTF-8" ?>
            <user id="1">
                <name>John Doe</name>
                <email>john.doe@example.com</email>
                <roles>
                    <role>Member</role>
                    <role>Admin</role>
                </roles>
                <admin>true</admin>
            </user>`;


const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [bgColor, setBgColor] = useState<string>(initBgColor);

  useEffect(() => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes(element.getNodes());

    setEdges(element.getEdeges());
  }, []);

  const onConnect = (connection: Connection) =>
    setEdges((eds) => addEdge({ ...connection, animated: true, style: { stroke: '#fff' } }, eds));

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        style={{ background: bgColor, height: 1024 }}
        onInit={onInit}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultZoom={1.0}
        fitView
      >
        <MiniMap
          nodeStrokeColor={(n: Node): string => {
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'selectorNode') return bgColor;
            if (n.type === 'output') return '#ff0072';

            return '#eee';
          }}
          nodeColor={(n: Node): string => {
            if (n.type === 'selectorNode') return bgColor;

            return '#fff';
          }}
        />
        <Controls />
      </ReactFlow>
    </>
  );
};

export default App;
