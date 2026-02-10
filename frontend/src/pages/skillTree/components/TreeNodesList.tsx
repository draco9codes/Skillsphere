import { type TreeNode } from "@/services/skillTreeService";
import NodeCard from "./NodeCard";

interface TreeNodesListProps {
  nodes: TreeNode[];
  treeId: number;
  onNodeComplete: (updatedProgress: number) => void;
}

export default function TreeNodesList({
  nodes,
  treeId,
  onNodeComplete,
}: TreeNodesListProps) {
  // Sort nodes by orderIndex
  const sortedNodes = [...nodes].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="space-y-4">
      {sortedNodes.map((node, index) => (
        <NodeCard
          key={node.nodeId}
          node={node}
          treeId={treeId}
          index={index + 1}
          onComplete={onNodeComplete}
        />
      ))}
    </div>
  );
}
