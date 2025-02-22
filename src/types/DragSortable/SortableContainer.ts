export type SortableContainerProps = {
  children: React.ReactNode;
  items: { id: string; [key: string]: any }[];
  onDragEnd: (oldIndex: number, newIndex: number) => void;
};
