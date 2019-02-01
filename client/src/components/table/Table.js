import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './table.css'


const Table = props => {
  const showPagination = data => {
    return data.length > props.defaultPageSize;
  };
  const pageSize= data => {
    if ( data.length < 8) {
      return data.length
    }
    else {
      return props.defaultPageSize
    }
  };

  return(
    <ReactTable
      data={props.data}
      columns={props.columns}
      resolveData={data => data.map(row => row)}
      showPagination={showPagination(props.data)}
      defaultPageSize={8}
    />
  )
};

export default Table