import React from 'react';
import TableComponent from './TableComponent';
import { useOutletContext } from 'react-router-dom';

const TablePage = () => {
    const { filteredData } = useOutletContext();

    return (
        <TableComponent data={filteredData} />
    );
};

export default TablePage;
