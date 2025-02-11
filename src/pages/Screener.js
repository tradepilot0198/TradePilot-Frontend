import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Screener.css";
import Footer from "../components/Footer";


const Screener = () => {
  const [data, setData] = useState([]);
  const [bullishData, setBullishData] = useState([]);
  const [bearishData, setBearishData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [bullishPage, setBullishPage] = useState(1);
  const [bearishPage, setBearishPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get-rsi-data")
      .then((response) => {
        setData(response.data);
        filterData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  // Filter Data for Bullish & Bearish Lists
  const filterData = (allData) => {
    setBullishData(allData.filter(row => row["15m_rsi"] > 50 && row["1h_rsi"] > 50 && row["4h_rsi"] > 50 && row["24h_rsi"] > 50));
    setBearishData(allData.filter(row => row["15m_rsi"] < 50 && row["1h_rsi"] < 50 && row["4h_rsi"] < 50 && row["24h_rsi"] < 50));
  };


  //  Sorting Function
  const handleSort = (column) => {
    const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);


    const sortedData = [...data].sort((a, b) => {
      if (column === "symbol") {
        return newOrder === "asc" ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
      } else {
        return newOrder === "asc" ? a[column] - b[column] : b[column] - a[column];
      }
    });


    setData(sortedData);
    filterData(sortedData);
  };


  // Pagination 
  const paginateData = (list, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return list.slice(startIndex, startIndex + itemsPerPage);
  };


  const totalPages = Math.ceil(data.length / itemsPerPage);
  const bullishTotalPages = Math.ceil(bullishData.length / itemsPerPage);
  const bearishTotalPages = Math.ceil(bearishData.length / itemsPerPage);


  const handlePageChange = (setter, page, maxPages) => {
    if (page >= 1 && page <= maxPages) {
      setter(page);
    }
  };


  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value > 0 ? value : 10);
    setCurrentPage(1);
    setBullishPage(1);
    setBearishPage(1);
  };


  return (
    <div>


<div className="screener-container">
      <h2>RSI Screener</h2>


      {/* Items Per Page Selection */}
      <div className="items-per-page">
        <label>Custom Items per page: </label>
        <input
          type="number"
          min="1"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          placeholder="Custom" style={{width:'50px !important', minWidth:'30px'}}
        />
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="100">100</option>
        </select>
       
      </div>


      {/* Main Screener Table */}
      <h3>All Symbols</h3>
      <TableComponent data={paginateData(data, currentPage)} handleSort={handleSort} sortColumn={sortColumn} sortOrder={sortOrder} />
      <PaginationControls currentPage={currentPage} totalPages={totalPages} handlePageChange={(page) => handlePageChange(setCurrentPage, page, totalPages)} />


      {/* Bullish List Table */}
      <h3>Bullish List (RSI Greater Than 50)</h3>
      <TableComponent data={paginateData(bullishData, bullishPage)} />
      <PaginationControls currentPage={bullishPage} totalPages={bullishTotalPages} handlePageChange={(page) => handlePageChange(setBullishPage, page, bullishTotalPages)} />

      {/* Bearish List Table */}
      <h3>Bearish List (RSI Less Than 50)</h3>
      <TableComponent data={paginateData(bearishData, bearishPage)} />
      <PaginationControls currentPage={bearishPage} totalPages={bearishTotalPages} handlePageChange={(page) => handlePageChange(setBearishPage, page, bearishTotalPages)} />
    </div>






    <Footer></Footer>
    </div>
   
  );
};


// Reusable Table Component
const TableComponent = ({ data, handleSort, sortColumn, sortOrder }) => (
  <table>
    <thead>
      <tr>
        <th>S.No.</th>
        <th onClick={() => handleSort && handleSort("symbol")}>
          Symbol {sortColumn === "symbol" && (sortOrder === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort && handleSort("markPrice")}>
          Mark Price {sortColumn === "markPrice" && (sortOrder === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort && handleSort("15m_rsi")}>
          15m RSI {sortColumn === "15m_rsi" && (sortOrder === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort && handleSort("1h_rsi")}>
          1h RSI {sortColumn === "1h_rsi" && (sortOrder === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort && handleSort("4h_rsi")}>
          4h RSI {sortColumn === "4h_rsi" && (sortOrder === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort && handleSort("24h_rsi")}>
          24h RSI {sortColumn === "24h_rsi" && (sortOrder === "asc" ? "↑" : "↓")}
        </th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{row.symbol}</td>
          <td>{row.markPrice}</td>
          <td>{row["15m_rsi"]}</td>
          <td>{row["1h_rsi"]}</td>
          <td>{row["4h_rsi"]}</td>
          <td>{row["24h_rsi"]}</td>
        </tr>
      ))}
    </tbody>
  </table>
);


// Reusable Pagination Controls
const PaginationControls = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="pagination">
    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
      Prev
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
      Next
    </button>
  </div>
);


export default Screener;
