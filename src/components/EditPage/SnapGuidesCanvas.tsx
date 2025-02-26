import React, { useState } from 'react';
import { DndContext, useDraggable, type DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';

// 定义画布边界
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

// 静态组件
const StaticBox = ({ position }: { position: { x: number; y: number } }) => (
  <div
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      width: 100,
      height: 50,
      background: '#4CAF50',
    }}
  >
    目标组件
  </div>
);

// 可拖拽组件（修复坐标溢出）
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
const SnapGuidesCanvas = () => {
  const [snapGuide, setSnapGuide] = useState<{ x?: number; y?: number } | null>(null);
  const [boxPos, setBoxPos] = useState({ x: 0, y: 0 });
  const staticPos = { x: 300, y: 200 };

  // 核心修复：限制坐标范围
  const clampPosition = (x: number, y: number) => {
    return {
      x: Math.max(0, Math.min(x, CANVAS_WIDTH - 100)), // 限制在画布宽度内
      y: Math.max(0, Math.min(y, CANVAS_HEIGHT - 50)), // 限制在画布高度内
    };
  };

  const handleDragEnd = ({ delta }: DragEndEvent) => {
    // 计算临时新位置（未限制边界）
    const rawX = boxPos.x + delta.x;
    const rawY = boxPos.y + delta.y;

    // 应用边界限制
    const clampedPos = clampPosition(rawX, rawY);

    // 吸附检测
    const THRESHOLD = 20; // 吸附阈值
    const isSnapX = Math.abs(clampedPos.x - staticPos.x) < THRESHOLD;
    const isSnapY = Math.abs(clampedPos.y - staticPos.y) < THRESHOLD;

    let finalPos = clampedPos;
    if (isSnapX || isSnapY) {
      finalPos = {
        x: isSnapX ? staticPos.x : clampedPos.x,
        y: isSnapY ? staticPos.y : clampedPos.y,
      };
      setSnapGuide({ x: isSnapX ? staticPos.x : undefined, y: isSnapY ? staticPos.y : undefined });
    } else {
      setSnapGuide(null);
    }

    // 二次边界检查（防止吸附后越界）
    setBoxPos(clampPosition(finalPos.x, finalPos.y));
  };

  return (
    <DndContext modifiers={[restrictToParentElement]} onDragEnd={handleDragEnd}>
      <div
        style={{
          position: 'relative',
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          border: '1px solid #ccc',
          overflow: 'hidden', // 隐藏溢出部分
        }}
      >
        <StaticBox position={staticPos} />

        {snapGuide && (
          <div
            style={{
              position: 'absolute',
              left: snapGuide.x ?? 0,
              top: snapGuide.y ?? 0,
              width: snapGuide.x ? 1 : '100%',
              height: snapGuide.y ? 1 : '100%',
              background: 'red',
              zIndex: 999,
            }}
          />
        )}

        <DraggableBox id="draggable" position={boxPos} />
      </div>
    </DndContext>
  );
};

export default SnapGuidesCanvas;
