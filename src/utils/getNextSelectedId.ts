import { Component } from '../types/QuestionPage';

export const getNextSelectedId = (componentList: Component[], currentId: string) => {
  const visibleComponentList = componentList.filter(c => !c.isHidden);
  const currentIndex = visibleComponentList.findIndex(c => c.fe_id === currentId);
  if (currentIndex === -1) return '';
  if (visibleComponentList.length <= 1) {
    return '';
  } else if (currentIndex === visibleComponentList.length - 1) {
    return visibleComponentList[currentIndex - 1]?.fe_id;
  } else {
    return visibleComponentList[currentIndex + 1]?.fe_id;
  }
};
