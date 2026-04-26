import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import Food_Item from "./Food_Item";
import SkeletonLoader from "./SkeletonCard";

const FoodDisplay = ({ category }) => {
  const { data, url, foodLoading } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Show 8 items per page

  // Filter data by category
  const filteredData = data.filter(item => 
    category === "All" || category === item.category
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll to top of food display
      document.getElementById('food-display')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg transition-all duration-300 ${
            i === currentPage
              ? 'text-white bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] shadow-lg'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );

    return pages;
  };

  if (foodLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <SkeletonLoader key={i} />
        ))}
      </div>
    );
  }

  return (
    <div id="food-display" className="fadeInUp">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Top dishes <span className="gradient-text">near you</span>
        </h2>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {filteredData.length} dishes available
          {category !== "All" && (
            <span className="ml-2 px-3 py-1 bg-[#ff6b6b] text-white text-xs font-medium rounded-full">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Food_Item item={item} url={url} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 fadeInUp">
          <div className="flex items-center justify-center">
            {renderPagination()}
          </div>
          <div className="text-sm text-gray-600 text-center">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} items
            {currentPage > 1 && (
              <span className="ml-2">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </div>
        </div>
      )}

      {/* No items message */}
      {filteredData.length === 0 && !foodLoading && (
        <div className="text-center py-20 fadeInUp">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">No dishes found</h3>
          <p className="text-gray-600 mb-8">
            {category === "All" 
              ? "We're working on adding more delicious options for you!" 
              : `No dishes found in the "${category}" category. Try browsing other categories.`
            }
          </p>
          {category !== "All" && (
            <button
              onClick={() => window.location.href = '/#explore-menu'}
              className="btn-primary text-white font-semibold px-8 py-3 rounded-full"
            >
              Browse All Categories
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
