import React from 'react';
import { isEmpty } from 'lodash';
import './ReactTable.css'
import {
  Dimmer,
  Header,
  Loader,
  List,
  Item,
  Grid,
  Segment,
} from 'semantic-ui-react';

// React Bootstrap Table 2
import BootstrapTableNext from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';

const formatNumber = x => {
  if (!x) return 'N/A';

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange,
}) => {
  let counter = 0;

  const pageOptions = options.map(option => {
    const isSelect = currSizePerPage === `${option.page}`;
    const separator = counter < options.length - 1 ? ', ' : '';
    counter++;

    return (
      <List.Item
        as="a"
        href="#"
        key={option.text}
        className={`${isSelect ? 'active' : ''}`}
        onClick={e => {
          e.preventDefault();
          onSizePerPageChange(option.page);
        }}
        // className={`btn ${isSelect ? 'btn-secondary' : 'btn-warning'}`}
      >
        {option.text}
        {separator}
      </List.Item>
    );
  });

  return (
    <>
      <List horizontal className="size-per-page" size="large">
        
      </List>
    </>
  );
};

const customTotal = (from, to, size) => (
  <Header as="h4">
    Showing {from} to {to} of {formatNumber(size)} Results
  </Header>
);

const options = {
  // sizePerPageRenderer,

  custom: true,
  showTotal: true,
  paginationSize: 4,
  pageStartIndex: 1,
  // alwaysShowAllBtns: true,
  withFirstAndLast: true,

  firstPageText: 'First',
  prePageText: 'Previous',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',

  paginationTotalRenderer: customTotal,
};

const ReactTable = ({
  data,
  page,
  total,
  limit,
  loading,
  columns,
  keyField,
  onTableChange,
  onSizePerPageChange,
  onPageChange,
  rowClasses,
  rowEvents,
  defaultSorted,
  remote = true,
  basic = false,
  selectRow = false,
  search,
}) => {
  // // Loading indicator
  // if (loading) {
  //   return (
  //     <Dimmer active inverted>
  //       {/* <Loader active inline="centered" content="Loading results..." /> */}
  //       <Loader content="Loading results..." />
  //     </Dimmer>
  //   );
  // }

  if (!selectRow) {
    selectRow = {
      mode: 'radio',
      hideSelectColumn: true,
      clickToSelect: false,
    };
  }

  return (
    <PaginationProvider
      pagination={
        remote
          ? paginationFactory({
              ...options,
              page: page || 1,
              sizePerPage: limit || 10,
              totalSize: total || 0,
              onPageChange: onPageChange,
              onSizePerPageChange: onSizePerPageChange,
              sizePerPageRenderer: sizePerPageRenderer,
            })
          : paginationFactory({
              ...options,
              totalSize: total || 0,
              sizePerPageRenderer: sizePerPageRenderer,
            })
      }
    >
      {({ paginationProps, paginationTableProps }) => (
        <div id="results" className="react-table" role="search">
          {loading && (
            <Dimmer active inverted>
              {/* <Loader active inline="centered" content="Loading results..." /> */}
              <Loader content="Loading results..." />
            </Dimmer>
          )}
          {!basic && <PaginationTotalStandalone {...paginationProps} />}
          <BootstrapTableNext
            rowClasses={rowClasses}
            rowEvents={rowEvents}
            defaultSorted={defaultSorted}
            remote={remote === true}
            hover
            selectRow={selectRow}
            striped
            bordered={false}
            keyField={keyField || '_id'}
            data={data || []}
            columns={columns || []}
            onTableChange={onTableChange || null}
            search={search || null}
            {...paginationTableProps}
          />
          <Segment basic>
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <SizePerPageDropdownStandalone {...paginationProps} />
                </Grid.Column>
                <Grid.Column>
                  <PaginationListStandalone {...paginationProps} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
      )}
    </PaginationProvider>
  );
};

export default ReactTable;
