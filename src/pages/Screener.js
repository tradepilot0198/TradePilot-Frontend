// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Screener.css";

// const Screener = () => {
//   const [data, setData] = useState([]);
//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

//   // ✅ Fetch Data from API
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/get-rsi-data")
//       .then((response) => setData(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // ✅ Sorting Function
//   const handleSort = (column) => {
//     const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
//     setSortColumn(column);
//     setSortOrder(newOrder);

//     const sortedData = [...data].sort((a, b) => {
//       if (column === "symbol") {
//         return newOrder === "asc" ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
//       } else {
//         return newOrder === "asc" ? a[column] - b[column] : b[column] - a[column];
//       }
//     });

//     setData(sortedData);
//   };

//   return (
//     <div className="screener-container">
//       <h2>RSI Screener</h2>
//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => handleSort("symbol")}>Symbol</th>
//             <th onClick={() => handleSort("markPrice")}>Mark Price</th>
//             <th onClick={() => handleSort("15m_rsi")}>15m RSI</th>
//             <th onClick={() => handleSort("1h_rsi")}>1h RSI</th>
//             <th onClick={() => handleSort("4h_rsi")}>4h RSI</th>
//             <th onClick={() => handleSort("24h_rsi")}>24h RSI</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               <td>{row.symbol}</td>
//               <td>{row.markPrice}</td>
//               <td>{row["15m_rsi"]}</td>
//               <td>{row["1h_rsi"]}</td>
//               <td>{row["4h_rsi"]}</td>
//               <td>{row["24h_rsi"]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Screener;








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Screener.css";

// const Screener = () => {
//   const [data, setData] = useState([]);
//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

//   // ✅ Fetch Data from API
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/get-rsi-data")
//       .then((response) => setData(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // ✅ Sorting Function
//   const handleSort = (column) => {
//     const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
//     setSortColumn(column);
//     setSortOrder(newOrder);

//     const sortedData = [...data].sort((a, b) => {
//       if (column === "symbol") {
//         return newOrder === "asc" ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
//       } else {
//         return newOrder === "asc" ? a[column] - b[column] : b[column] - a[column];
//       }
//     });

//     setData(sortedData);
//   };

//   // ✅ Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleItemsPerPageChange = (event) => {
//     const value = parseInt(event.target.value, 10);
//     setItemsPerPage(value > 0 ? value : 10);
//     setCurrentPage(1); // Reset to first page when items per page changes
//   };

//   return (
//     <div className="screener-container">
//       <h2>RSI Screener</h2>

//       {/* Items Per Page Selection */}
//       <div className="items-per-page">
//         <label>Items per page: </label>
//         <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
//           <option value="10">10</option>
//           <option value="25">25</option>
//           <option value="100">100</option>
//         </select>
//         <input
//           type="number"
//           min="1"
//           value={itemsPerPage}
//           onChange={handleItemsPerPageChange}
//           placeholder="Custom"
//         />
//       </div>

//       {/* Table */}
//       <table>
//         <thead>
//           <tr>
//             <th>S.No.</th> {/* ✅ Added Serial Number Header */}
//             <th onClick={() => handleSort("symbol")}>Symbol</th>
//             <th onClick={() => handleSort("markPrice")}>Mark Price</th>
//             <th onClick={() => handleSort("15m_rsi")}>15m RSI</th>
//             <th onClick={() => handleSort("1h_rsi")}>1h RSI</th>
//             <th onClick={() => handleSort("4h_rsi")}>4h RSI</th>
//             <th onClick={() => handleSort("24h_rsi")}>24h RSI</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((row, index) => (
//             <tr key={index}>
//               <td>{indexOfFirstItem + index + 1}</td> {/* ✅ Serial Number (S.No) */}
//               <td>{row.symbol}</td>
//               <td>{row.markPrice}</td>
//               <td>{row["15m_rsi"]}</td>
//               <td>{row["1h_rsi"]}</td>
//               <td>{row["4h_rsi"]}</td>
//               <td>{row["24h_rsi"]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="pagination">
//         <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//           Prev
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Screener;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Screener.css";

// const Screener = () => {
//   const [data, setData] = useState([]);
//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [bullishPage, setBullishPage] = useState(1);
//   const [bearishPage, setBearishPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

//   // ✅ Fetch Data from API
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/get-rsi-data")
//       .then((response) => setData(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // ✅ Sorting Function
//   const handleSort = (column) => {
//     const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
//     setSortColumn(column);
//     setSortOrder(newOrder);

//     const sortedData = [...data].sort((a, b) => {
//       if (column === "symbol") {
//         return newOrder === "asc" ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
//       } else {
//         return newOrder === "asc" ? a[column] - b[column] : b[column] - a[column];
//       }
//     });

//     setData(sortedData);
//   };

//   // ✅ Filters for Bullish & Bearish Lists
//   const bullishList = data.filter(
//     (row) => row["15m_rsi"] > 50 && row["1h_rsi"] > 50 && row["4h_rsi"] > 50 && row["24h_rsi"] > 50
//   );

//   const bearishList = data.filter(
//     (row) => row["15m_rsi"] < 50 && row["1h_rsi"] < 50 && row["4h_rsi"] < 50 && row["24h_rsi"] < 50
//   );

//   // ✅ Pagination Logic
//   const paginate = (list, page) => {
//     const start = (page - 1) * itemsPerPage;
//     return list.slice(start, start + itemsPerPage);
//   };

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const totalBullishPages = Math.ceil(bullishList.length / itemsPerPage);
//   const totalBearishPages = Math.ceil(bearishList.length / itemsPerPage);

//   return (
//     <div className="screener-container">
//       <h2>RSI Screener</h2>

//       {/* Items Per Page Selection */}
//       <div className="items-per-page">
//         <label>Items per page: </label>
//         <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
//           <option value="10">10</option>
//           <option value="25">25</option>
//           <option value="100">100</option>
//         </select>
//       </div>

//       {/* ✅ Main Table */}
//       <h3>All Symbols</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>S.No.</th>
//             <th onClick={() => handleSort("symbol")}>Symbol</th>
//             <th onClick={() => handleSort("markPrice")}>Mark Price</th>
//             <th onClick={() => handleSort("15m_rsi")}>15m RSI</th>
//             <th onClick={() => handleSort("1h_rsi")}>1h RSI</th>
//             <th onClick={() => handleSort("4h_rsi")}>4h RSI</th>
//             <th onClick={() => handleSort("24h_rsi")}>24h RSI</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginate(data, currentPage).map((row, index) => (
//             <tr key={index}>
//               <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//               <td>{row.symbol}</td>
//               <td>{row.markPrice}</td>
//               <td>{row["15m_rsi"]}</td>
//               <td>{row["1h_rsi"]}</td>
//               <td>{row["4h_rsi"]}</td>
//               <td>{row["24h_rsi"]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ✅ Pagination for Main Table */}
//       <div className="pagination">
//         <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//       </div>

//       {/* ✅ Bullish List */}
//       <h3>Bullish List (RSI Greater Than 50)</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>S.No.</th>
//             <th>Symbol</th>
//             <th>Mark Price</th>
//             <th>15m RSI</th>
//             <th>1h RSI</th>
//             <th>4h RSI</th>
//             <th>24h RSI</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginate(bullishList, bullishPage).map((row, index) => (
//             <tr key={index}>
//               <td>{(bullishPage - 1) * itemsPerPage + index + 1}</td>
//               <td>{row.symbol}</td>
//               <td>{row.markPrice}</td>
//               <td>{row["15m_rsi"]}</td>
//               <td>{row["1h_rsi"]}</td>
//               <td>{row["4h_rsi"]}</td>
//               <td>{row["24h_rsi"]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ✅ Pagination for Bullish Table */}
//       <div className="pagination">
//         <button onClick={() => setBullishPage(bullishPage - 1)} disabled={bullishPage === 1}>Prev</button>
//         <span>Page {bullishPage} of {totalBullishPages}</span>
//         <button onClick={() => setBullishPage(bullishPage + 1)} disabled={bullishPage === totalBullishPages}>Next</button>
//       </div>

//       {/* ✅ Bearish List */}
//       <h3>Bearish List (RSI Less than 50)</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>S.No.</th>
//             <th>Symbol</th>
//             <th>Mark Price</th>
//             <th>15m RSI</th>
//             <th>1h RSI</th>
//             <th>4h RSI</th>
//             <th>24h RSI</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginate(bearishList, bearishPage).map((row, index) => (
//             <tr key={index}>
//               <td>{(bearishPage - 1) * itemsPerPage + index + 1}</td>
//               <td>{row.symbol}</td>
//               <td>{row.markPrice}</td>
//               <td>{row["15m_rsi"]}</td>
//               <td>{row["1h_rsi"]}</td>
//               <td>{row["4h_rsi"]}</td>
//               <td>{row["24h_rsi"]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ✅ Pagination for Bearish Table */}
//       <div className="pagination">
//         <button onClick={() => setBearishPage(bearishPage - 1)} disabled={bearishPage === 1}>Prev</button>
//         <span>Page {bearishPage} of {totalBearishPages}</span>
//         <button onClick={() => setBearishPage(bearishPage + 1)} disabled={bearishPage === totalBearishPages}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default Screener;












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

  // ✅ Fetch Data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get-rsi-data")
      .then((response) => {
        setData(response.data);
        filterData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // ✅ Filter Data for Bullish & Bearish Lists
  const filterData = (allData) => {
    setBullishData(allData.filter(row => row["15m_rsi"] > 50 && row["1h_rsi"] > 50 && row["4h_rsi"] > 50 && row["24h_rsi"] > 50));
    setBearishData(allData.filter(row => row["15m_rsi"] < 50 && row["1h_rsi"] < 50 && row["4h_rsi"] < 50 && row["24h_rsi"] < 50));
  };

  // ✅ Sorting Function
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

  // ✅ Pagination Logic
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

      {/* ✅ Main Screener Table */}
      <h3>All Symbols</h3>
      <TableComponent data={paginateData(data, currentPage)} handleSort={handleSort} sortColumn={sortColumn} sortOrder={sortOrder} />
      <PaginationControls currentPage={currentPage} totalPages={totalPages} handlePageChange={(page) => handlePageChange(setCurrentPage, page, totalPages)} />

      {/* ✅ Bullish List Table */}
      <h3 style={{color:'white'}}>Bullish List (RSI Greater Than 50)</h3>
      <TableComponent data={paginateData(bullishData, bullishPage)} />
      <PaginationControls currentPage={bullishPage} totalPages={bullishTotalPages} handlePageChange={(page) => handlePageChange(setBullishPage, page, bullishTotalPages)} />

      {/* ✅ Bearish List Table */}
      <h3 style={{color:'white'}}>Bearish List (RSI Less Than 50)</h3>
      <TableComponent data={paginateData(bearishData, bearishPage)} />
      <PaginationControls currentPage={bearishPage} totalPages={bearishTotalPages} handlePageChange={(page) => handlePageChange(setBearishPage, page, bearishTotalPages)} />
    </div>



    <Footer></Footer>
    </div>
    
  );
};

// ✅ Reusable Table Component
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

// ✅ Reusable Pagination Controls
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
