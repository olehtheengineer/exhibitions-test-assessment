import { Table } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { Exhibition, ExhibitionStatus } from '../exhibition.model';

type ExhibitionsTableProps = {
  exhibitions: Exhibition[];
  loading?: boolean;
  total: number;
  page: number;
  pageSize: number;
  sortField: string;
  sortOrder: 'ascend' | 'descend' | null;
  onChange: any;
};

const ExhibitionsTable = ({
  exhibitions,
  loading = false,
  total,
  page,
  pageSize,
  sortField,
  sortOrder,
  onChange,
}: ExhibitionsTableProps) => {
  const exhibitionsWithKeys = exhibitions.map((exhibition) => ({
    ...exhibition,
    key: exhibition.id,
  }));

  return (
    <WrappedTable
      dataSource={exhibitionsWithKeys}
      loading={loading}
      pagination={{
        current: page,
        pageSize,
        total,
        showSizeChanger: false,
      }}
      rowClassName={(record) =>
        (record as Exhibition).status === ExhibitionStatus.Closed
          ? 'exhibition-closed'
          : 'exhibition-open'
      }
      onChange={onChange}
    >
      <Table.Column<Exhibition>
        key="title"
        title="Title"
        dataIndex="title"
        width="20%"
        sorter={(a, b) => a.title.localeCompare(b.title)}
        sortOrder={sortField === 'title' ? sortOrder : null}
      />
      <Table.Column<Exhibition>
        key="description"
        title="Description"
        dataIndex="description"
        width="40%"
        ellipsis
        sorter={(a, b) => (a.description || '').localeCompare(b.description)}
        sortOrder={sortField === 'description' ? sortOrder : null}
      />
      <Table.Column<Exhibition>
        key="is_featured"
        title="Is Featured"
        dataIndex="is_featured"
        width="10%"
        render={(exhibition: Exhibition) =>
          exhibition.is_featured ? 'Yes' : 'No'
        }
        sorter={(a) => (a.is_featured ? 1 : -1)}
        sortOrder={sortField === 'is_featured' ? sortOrder : null}
      />
      <Table.Column<Exhibition>
        key="gallery_title"
        title="Gallery Title"
        dataIndex="gallery_title"
        width="15%"
        sorter={(a, b) =>
          (a.gallery_title || '').localeCompare(b.gallery_title)
        }
        sortOrder={sortField === 'gallery_title' ? sortOrder : null}
      />
      <Table.Column<Exhibition>
        key="type"
        title="Type of Exhibition"
        dataIndex="type"
        width="15%"
        sorter={(a, b) => (a.type || '').localeCompare(b.type)}
        sortOrder={sortField === 'type' ? sortOrder : null}
      />
    </WrappedTable>
  );
};

const WrappedTable = styled(Table)`
  .exhibition-closed {
    background: ${(props) => props.theme.colors.green};
  }

  .exhibition-open {
    background: ${(props) => props.theme.colors.red};
  }
`;

export default ExhibitionsTable;
