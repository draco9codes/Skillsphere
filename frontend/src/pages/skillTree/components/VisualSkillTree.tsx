import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { type TreeNode } from "@/services/skillTreeService";
import SkillNode from "./SkillNode";

interface VisualSkillTreeProps {
  nodes: TreeNode[];
  treeId: number;
  onNodeComplete: (updatedProgress: number) => void;
}

const nodeTypes = {
  skillNode: SkillNode,
};

export default function VisualSkillTree({
  nodes,
  treeId,
  onNodeComplete,
}: VisualSkillTreeProps) {
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState([]);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // Convert tree nodes to React Flow nodes
    const convertedNodes: Node[] = nodes.map((node, index) => {
      // Calculate position in a tree layout
      const row = Math.floor(index / 3); // 3 nodes per row
      const col = index % 3;

      const x = col * 300 + 150;
      const y = row * 200 + 100;

      return {
        id: node.nodeId.toString(),
        type: "skillNode",
        position: { x, y },
        data: {
          node,
          treeId,
          onComplete: onNodeComplete,
        },
      };
    });

    // Create edges (connections between nodes)
    const convertedEdges: Edge[] = nodes
      .slice(0, -1) // All except last node
      .map((node, index) => ({
        id: `e${node.nodeId}-${nodes[index + 1].nodeId}`,
        source: node.nodeId.toString(),
        target: nodes[index + 1].nodeId.toString(),
        type: "smoothstep",
        animated: !node.isCompleted && !nodes[index + 1].isLocked,
        style: {
          stroke: node.isCompleted ? "#10b981" : "#5B8DB0",
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: node.isCompleted ? "#10b981" : "#5B8DB0",
        },
      }));

    setFlowNodes(convertedNodes);
    setFlowEdges(convertedEdges);
  }, [nodes, treeId, onNodeComplete]);

  return (
    <div className="h-[800px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl border-2 border-neutral-700 overflow-hidden shadow-2xl">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Strict}
        fitView
        attributionPosition="bottom-left"
        className="skill-tree-canvas"
      >
        <Background
          color="#475569"
          gap={20}
          size={1}
          style={{ opacity: 0.3 }}
        />
        <Controls className="bg-neutral-800 border border-neutral-700 rounded-lg" />
        <MiniMap
          nodeColor={(node) => {
            const nodeData = node.data.node as TreeNode;
            if (nodeData.isCompleted) return "#10b981";
            if (nodeData.isLocked) return "#64748b";
            return "#5B8DB0";
          }}
          className="bg-neutral-800 border border-neutral-700 rounded-lg"
          maskColor="rgba(0, 0, 0, 0.6)"
        />
      </ReactFlow>
    </div>
  );
}
