import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';
import userReducer, { UserState } from './user_reducers';
import componentsReducer, { ComponentsState } from './components_reducer';
import pageInfoReducer, { PageInfoState } from './pageInfo_reducers';

export type StoreStateType = {
  user: UserState;
  components: StateWithHistory<ComponentsState>;
  pageInfo: PageInfoState;
};

const store = configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/changeSelectedId',
        'components/resetComponents',
        'components/changeSelectedIdToNext',
        'components/changeSelectedIdToPrev',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
});

export default store;
