import React from 'react';
import { currencyType } from '../types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { getRightDate } from '../utils';
interface TableRowItemProps
{
    row:currencyType
}
const TableRowItem:React.FC<TableRowItemProps> = ({row}) => {
    return (
        <div
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <p component="th" scope="row">
          {row.symbol}
        </p>
        <p align="right">{row.close}</p>
        <p align="right">{row.open}</p>
        <p align="right">{row.volume}</p>
        <p align="right">{row.fclose}</p>
        <p align="right">{row.fhigh}</p>
        <p align="right">{row.flow}</p>
        <p align="right">{row.fopen}</p>
        <p align="right">{getRightDate(row.date)}</p>
      </div>
    );
};


export default TableRowItem;