import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import {
  copyComponent,
  deleteComponent,
  pasteComponent,
  changeSelectedIdToNext,
  changeSelectedIdToPrev,
} from '../stores/components_reducer';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
/**
 * 判断当前激活的元素是否是画布
 * @returns 是画布返回true，否则返回false
 */
const isActiveElement = () => {
  const activeElement = document.activeElement;
  // 没有增加dnd-kit之前
  // if (activeElement === document.body) {
  // 如果当前激活的元素是body，则认为是画布
  // return true;
  // }

  // 增加dnd-kit之后
  if (activeElement === document.body) return true;
  if (activeElement?.matches('div[role="button"]')) return true;
  return false;
};

export const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch();

  /**
   * 删除组件
   */
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElement()) return;
    dispatch(deleteComponent());
  });

  /**
   * 复制组件
   */
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElement()) return;
    dispatch(copyComponent());
  });

  /**
   * 粘贴组件
   */
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElement()) return;
    dispatch(pasteComponent());
  });

  /**
   * 选中下一个组件
   */
  useKeyPress(40, () => {
    if (!isActiveElement()) return;
    dispatch(changeSelectedIdToNext());
  });

  /**
   * 选中上一个组件
   */
  useKeyPress('uparrow', () => {
    if (!isActiveElement()) return;
    dispatch(changeSelectedIdToPrev());
  });

  /**
   * 撤销
   */
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElement()) return;
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true, // 精确匹配
    }
  );

  /**
   * 重做
   */
  useKeyPress(
    ['ctrl.y', 'meta.y'],
    () => {
      if (!isActiveElement()) return;
      dispatch(UndoActionCreators.redo());
    },
    {
      exactMatch: true, // 精确匹配
    }
  );
};
