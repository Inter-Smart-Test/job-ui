import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

export default function PaginatedItems({
  itemsPerPage,
  array,
  setItemOffset,
  pageCount,
  scrollToSection,
}) {
  const handlePageClick = (event) => {
    scrollToSection();
    const newOffset = (event.selected * itemsPerPage) % array.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-col justify-center py-7 w-[100%] h-[100%]">
        <ReactPaginate
          activeClassName={"item active "}
          breakClassName={"item text-black"}
          breakLabel={"..."}
          className="flex items-center justify-center h-15 w-[100%] relative bg-gray-2 dark:bg-meta-4"
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          nextLabel={
            <img
              src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
              alt="next-pagination"
              className="h-10"
            />
          }
          previousLabel={
            <img
              src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
              alt="previous-pagination"
              className="h-10 rotate-180"
            />
          }
          onPageChange={handlePageClick}
          pageCount={pageCount}
          pageClassName={"item pagination-page "}
          pageRangeDisplayed={2}
          previousClassName={"item previous"}
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}
