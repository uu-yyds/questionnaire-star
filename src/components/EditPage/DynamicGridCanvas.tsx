import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// 可拖拽组件
const DraggableBox = ({ id, position }: { id: string; position: { x: number; y: number } }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    left: position.x,
    top: position.y,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'absolute',
        width: 100,
        height: 50,
        background: '#2196F3',
        cursor: 'move',
      }}
      {...listeners}
      {...attributes}
    >
      拖拽我
    </div>
  );
};

// 主画布
export default function DynamicGridCanvas() {
  const [zoom] = useState(1); // 缩放级别
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({
    box1: { x: 0, y: 0 },
  });

  // 栅格大小计算
  const gridSize = 20 / zoom;

  return (
    <DndContext
      onDragEnd={(event: DragEndEvent) => {
        const { delta, active } = event;
        const newX = Math.round((positions[active.id].x + delta.x) / gridSize) * gridSize;
        const newY = Math.round((positions[active.id].y + delta.y) / gridSize) * gridSize;

        setPositions({
          ...positions,
          [active.id]: { x: newX, y: newY },
        });
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent ${gridSize - 1}px,
          #eee ${gridSize - 1}px,
          #eee ${gridSize}px
        )`,
        }}
      >
        <DraggableBox id="box1" position={positions.box1} />
      </div>
    </DndContext>
  );
}
