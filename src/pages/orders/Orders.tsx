import { useState } from "react";
import orderdata from "../../api/orderdata.json";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on search query
  const filteredData = orderdata.filter(
    (val) =>
      val.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.paymentInfo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <>
      <div className="">
        <h1 className=" font-inter font-semibold text-[#222222]">
          Orders List
        </h1>
      </div>
      <div className="p-4 mt-4 border border-solid border-[#f0f0f0] rounded-[10px] w-full">
        <div className="flex items-center justify-between gap-3 my-2">
          <div>
            <label htmlFor="">
              Show{" "}
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="w-16"
                name=""
                id=""
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "}
              Entries
            </label>
          </div>
          <div>
            <label htmlFor="">
              Search: {"  "}
              <input
                className="inline-block w-auto border-solid border-[#f0f0f0] text-[16px] text-[#212529] py-1 px-2 rounded-[4px] border-[1px]"
                type="text"
                placeholder="Search by product, customer, or status..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </label>
          </div>
        </div>
        <div>
          <table className="w-full text-start">
            <thead>
              <tr className="uppercase border-b-[1px] border-b-solid border-b-[#f0f0f0] text-[#212529]">
                <th className="p-2 text-start">SR NO</th>
                <th className="p-2 text-start">ID</th>
                <th className="p-2 text-start">Item</th>
                <th className="p-2 text-start">Customer name</th>
                <th className="p-2 text-start">payment info</th>
                <th className="p-2 text-start">price</th>
                <th className="p-2 text-start">status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((val) => (
                  <tr
                    className="text-[#424242] border-b-[1px] border-b-solid border-b-[#f0f0f0] hover:bg-[#f0f0f0]"
                    key={val._id}
                  >
                    <td className="p-3 font-bold">{val.index}</td>
                    <td className="p-3 font-bold">{val.id}</td>
                    <td className="p-3 flex items-center">
                      <img
                        className="w-[56px] mr-2 rounded-[12px] min-w-[56px] h-[56px]"
                        src={val.picture}
                        alt=""
                      />
                      <span>{val.productName}</span>
                    </td>
                    <td className="p-3">{val.name}</td>
                    <td className="p-3">{val.paymentInfo}</td>
                    <td className="p-3">{val.price}</td>
                    <td className="p-3 ">
                      <span
                        className={`p-1 text-white rounded-[5px] 
                    ${
                      val.status === "completed"
                        ? "bg-[#198754]"
                        : val.status === "pending"
                        ? "bg-[#ffc107]"
                        : "bg-[#0d6efd]"
                    }`}
                      >
                        {val.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            {/* Pagination buttons */}
            <div>
              <button
                className="p-2 border rounded mr-2 bg-blue-800  disabled:bg-blue-200 text-white cursor-pointer  disabled:cursor-default"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="p-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredData.length / itemsPerPage)}
              </span>
              <button
                className="p-2 border rounded ml-2 bg-blue-800  disabled:bg-blue-200 text-white cursor-pointer  disabled:cursor-default"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastItem >= filteredData.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
