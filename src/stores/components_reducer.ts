import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Component } from '../types/QuestionPage';
import type { ComponentPropsType } from '../types/QuestionComponents';
import { nanoid } from 'nanoid';
import { getNextSelectedId } from '../utils/getNextSelectedId';
import _ from 'lodash';
import { arrayMove } from '@dnd-kit/sortable';

export interface ComponentsState {
  componentList: Component[];
  selectedId: string | null;
  copiedComponent: Component | null;
}

const INITIAL_STATE: ComponentsState = {
  selectedId: null,
  componentList: [],
  copiedComponent: null,
};

const componentsSlice = createSlice({
  name: 'components',
  initialState: INITIAL_STATE,
  reducers: {
    resetComponents: (state: ComponentsState, action: PayloadAction<Component[]>) => {
      return {
        ...state,
        componentList: action.payload,
      };
    },
    changeSelectedId: (state: ComponentsState, action: PayloadAction<string | null>) => {
      return {
        ...state,
        selectedId: action.payload,
      };
    },
    addComponent: (state: ComponentsState, action: PayloadAction<Component>) => {
      const newComponent = {
        ...action.payload,
        fe_id: nanoid(),
        isHidden: false,
        isLocked: false,
        isDisabled: false,
      };
      const { selectedId, componentList } = state;
      const newComponentList = insertNewComponent(newComponent, componentList, selectedId || '');
      state.componentList = newComponentList;
      state.selectedId = newComponent.fe_id;
    },
    updateComponent: (state: ComponentsState, action: PayloadAction<ComponentPropsType>) => {
      const { selectedId } = state;
      const { componentList } = state;
      const index = componentList.findIndex(c => c.fe_id === selectedId);
      if (index !== -1) {
        componentList[index].props = { ...componentList[index].props, ...action.payload };
      }
      state.componentList = componentList;
    },
    deleteComponent: (state: ComponentsState) => {
      const { componentList, selectedId } = state;
      state.selectedId = getNextSelectedId(componentList, selectedId || '') || '';
      const index = componentList.findIndex(c => c.fe_id === selectedId);
      if (index !== -1) {
        componentList.splice(index, 1);
      }
      state.componentList = componentList;
    },
    toggleComponentHidden: (
      state: ComponentsState,
      action: PayloadAction<{ isHidden: boolean; fe_id?: string }>
    ) => {
      const { isHidden, fe_id } = action.payload;
      const { componentList, selectedId } = state;
      if (isHidden) {
        state.selectedId = getNextSelectedId(componentList, fe_id || selectedId || '') || '';
      } else {
        state.selectedId = selectedId;
      }
      const index = componentList.findIndex(c => c.fe_id === fe_id || c.fe_id === selectedId);
      if (index !== -1) {
        componentList[index].isHidden = isHidden;
      }
      state.componentList = componentList;
    },
    toggleComponentLocked: (state: ComponentsState, action: PayloadAction<string>) => {
      const { componentList } = state;
      const index = componentList.findIndex(c => c.fe_id === action?.payload);
      if (index !== -1) {
        componentList[index].isLocked = !componentList[index].isLocked;
      }
      state.componentList = componentList;
    },
    copyComponent: (state: ComponentsState) => {
      const { componentList, selectedId } = state;
      const index = componentList.findIndex(c => c.fe_id === selectedId);
      if (index !== -1) {
        state.copiedComponent = _.cloneDeep(componentList[index]);
      }
    },
    pasteComponent: (state: ComponentsState) => {
      const { copiedComponent, componentList, selectedId } = state;
      if (!copiedComponent) return;
      const newComponent = {
        ...copiedComponent,
        fe_id: nanoid(),
        isHidden: false,
        isLocked: false,
        isDisabled: false,
      };
      state.componentList = insertNewComponent(newComponent, componentList, selectedId || '');
    },
    // 选中下一个组件
    changeSelectedIdToNext: (state: ComponentsState) => {
      const { componentList, selectedId } = state;
      const index = componentList.findIndex(c => c.fe_id === selectedId);
      if (index === -1) return; // 未选中组件，不进行操作
      if (index === componentList.length - 1) return; // 选中最后一个组件，不进行操作
      state.selectedId = componentList[index + 1].fe_id || null;
    },
    // 选中上一个组件
    changeSelectedIdToPrev: (state: ComponentsState) => {
      const { componentList, selectedId } = state;
      const index = componentList.findIndex(c => c.fe_id === selectedId);
      if (index === -1) return; // 未选中组件，不进行操作
      if (index === 0) return; // 选中第一个组件，不进行操作
      state.selectedId = componentList[index - 1].fe_id || null;
    },
    // 修改组件标题
    changeComponentTitle: (state: ComponentsState, action: PayloadAction<string>) => {
      const { componentList, selectedId } = state;
      const index = componentList.findIndex(c => c.fe_id === selectedId);
      if (index !== -1) {
        componentList[index].title = action.payload;
      }
      state.componentList = componentList;
    },
    // 拖拽排序
    dragSortComponent: (
      state: ComponentsState,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList } = state;
      const { oldIndex, newIndex } = action.payload;
      const newComponentList = arrayMove(componentList, oldIndex, newIndex);
      state.componentList = newComponentList;
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  updateComponent,
  deleteComponent,
  toggleComponentHidden,
  toggleComponentLocked,
  copyComponent,
  pasteComponent,
  changeSelectedIdToNext,
  changeSelectedIdToPrev,
  changeComponentTitle,
  dragSortComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;

export const insertNewComponent = (
  newComponent: Component,
  componentList: Component[],
  selectedId: string
) => {
  const index = componentList.findIndex(c => c.fe_id === selectedId);
  if (index === -1) {
    // 未选中组件，插入到最后
    componentList.push(newComponent);
  } else {
    // 选中组件，插入到当前组件后面
    componentList.splice(index + 1, 0, newComponent);
  }
  return componentList;
};
