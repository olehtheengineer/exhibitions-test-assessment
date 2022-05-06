import { Input } from 'antd';
import React, { useCallback, useReducer } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

import ExhibitionsTable from '../components/ExhibitionsTable';
import {
  ArticApiUrl,
  DefaultLimit,
  ExhibitionFields,
  ExhibitionsSearchResult,
  fetcher,
} from '../exhibition.query';
import {
  ExhibitionAction,
  ExhibitionActionType,
  exhibitionsReducer,
  ExhibitionsState,
} from '../exhibition.reducer';

const { Search } = Input;

const ExhibitionsPage = () => {
  const [exhibitionsState, dispatch] = useReducer<
    React.Reducer<ExhibitionsState, ExhibitionAction>
  >(exhibitionsReducer, {
    page: 1,
    query: '',
    limit: DefaultLimit,
    sortField: '',
    sortOrder: null,
  });

  const { data, error } = useSWR<ExhibitionsSearchResult>(
    `${ArticApiUrl}/exhibitions/search?limit=${exhibitionsState.limit}&page=${exhibitionsState.page}&q=${exhibitionsState.query}&fields=${ExhibitionFields}`,
    fetcher,
  );
  const exhibitions = data?.data || [];

  const onTableChange = useCallback(
    (pagination: any, _filters: any, sorter: any) => {
      // TODO: implement sort when API documentation clarification provided
      const nextTableConfig = {
        sortField: sorter.order ? sorter.columnKey ?? '' : '',
        sortOrder: sorter.order ?? null,
        page: pagination.current,
      };

      dispatch({
        type: ExhibitionActionType.SetTableConfig,
        ...nextTableConfig,
      });
    },
    [dispatch],
  );

  const onSearch = useCallback(
    (value: string) => {
      dispatch({
        type: ExhibitionActionType.SetQuery,
        query: value,
      });
    },
    [dispatch],
  );

  const errorMessage = data?.error || error;

  return (
    <Content>
      <Headline>
        Exhibitions search powered by Art Institute of Chicago API
      </Headline>

      <SearchInput
        placeholder="Search exhibitions..."
        allowClear
        onSearch={onSearch}
        style={{ width: 300 }}
      />

      {errorMessage ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : (
        <ExhibitionsTable
          exhibitions={exhibitions}
          loading={Boolean(!data)}
          page={exhibitionsState.page}
          pageSize={exhibitionsState.limit}
          total={data?.pagination.total || 0}
          sortField={exhibitionsState.sortField}
          sortOrder={exhibitionsState.sortOrder}
          onChange={onTableChange}
        />
      )}
    </Content>
  );
};

const Content = styled.div`
  padding: 50px;
`;

const Headline = styled.h3`
  ${(props) => props.theme.fontStyle.h3}
  margin-bottom: 20px;
`;

const SearchInput = styled(Search)`
  width: 300px;
  margin-bottom: 24px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default ExhibitionsPage;
