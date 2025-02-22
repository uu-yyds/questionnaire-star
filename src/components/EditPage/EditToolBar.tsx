import React from 'react';
import { Button, Space, Tooltip, message } from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteComponent,
  toggleComponentHidden,
  toggleComponentLocked,
  copyComponent,
  pasteComponent,
  dragSortComponent,
  ComponentsState,
} from '../../stores/components_reducer';
import { StoreStateType } from '../../stores';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

const EditToolBar = () => {
  const dispatch = useDispatch();
  const { selectedId, componentList, copiedComponent } = useSelector<
    StoreStateType,
    ComponentsState
  >((state: StoreStateType) => state.components.present);
  const { isLocked } = componentList.find(c => c.fe_id === selectedId) || {};
  const componentLength = componentList.length;
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0; // 是否是第一个
  const isLast = selectedIndex >= componentLength - 1; // 是否是最后一个

  const handelDelete = () => {
    dispatch(deleteComponent());
  };
  const handelHidden = () => {
    dispatch(toggleComponentHidden({ isHidden: true }));
  };
  const handelLock = () => {
    dispatch(toggleComponentLocked(selectedId as string));
  };
  const handelCopy = () => {
    dispatch(copyComponent());
    if (copiedComponent) {
      message.success('复制成功');
    }
  };
  const handelPaste = () => {
    if (copiedComponent) {
      dispatch(pasteComponent());
      message.success('粘贴成功');
    }
  };
  const handelUp = () => {
    if (isFirst) return;
    dispatch(
      dragSortComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex - 1,
      })
    );
  };
  const handelDown = () => {
    if (isLast) return;
    dispatch(
      dragSortComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex + 1,
      })
    );
  };
  const handelUndo = () => {
    dispatch(UndoActionCreators.undo());
  };
  const handelRedo = () => {
    dispatch(UndoActionCreators.redo());
  };
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handelDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handelHidden} />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handelLock}
          type={isLocked ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handelCopy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handelPaste}
          disabled={!copiedComponent}
        />
      </Tooltip>
      <Tooltip title="上移">
        <Button shape="circle" icon={<ArrowUpOutlined />} onClick={handelUp} disabled={isFirst} />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<ArrowDownOutlined />}
          onClick={handelDown}
          disabled={!selectedId || isLast}
        />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={handelUndo} />
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={handelRedo} />
      </Tooltip>
    </Space>
  );
};

export default EditToolBar;
