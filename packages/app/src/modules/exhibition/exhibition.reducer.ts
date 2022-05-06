export type ExhibitionsState = {
  limit: number;
  page: number;
  query: string;
  sortField: string;
  sortOrder: 'ascend' | 'descend' | null;
};

export enum ExhibitionActionType {
  SetTableConfig = 'SET_TABLE_CONFIG',
  SetSorting = 'SET_SORTING',
  SetQuery = 'SET_QUERY',
  SetPage = 'SET_PAGE',
}

export type ExhibitionAction =
  | {
      type: ExhibitionActionType.SetTableConfig;
      page: number;
      sortField: string;
      sortOrder: 'ascend' | 'descend' | null;
    }
  | {
      type: ExhibitionActionType.SetSorting;
      sortField: string;
      sortOrder: 'ascend' | 'descend' | null;
    }
  | { type: ExhibitionActionType.SetQuery; query: string }
  | { type: ExhibitionActionType.SetPage; page: number };

export const exhibitionsReducer = (
  state: ExhibitionsState,
  action: ExhibitionAction,
) => {
  switch (action.type) {
    case ExhibitionActionType.SetTableConfig: {
      return {
        ...state,
        sortField: action.sortField,
        sortOrder: action.sortOrder,
        page: action.page,
      };
    }
    case ExhibitionActionType.SetSorting: {
      return {
        ...state,
        sortField: action.sortField,
        sortOrder: action.sortOrder,
      };
    }
    case ExhibitionActionType.SetQuery: {
      return {
        ...state,
        query: action.query,
        page: 1,
      };
    }
    case ExhibitionActionType.SetPage: {
      return {
        ...state,
        page: action.page,
      };
    }
    default: {
      return state;
    }
  }
};
