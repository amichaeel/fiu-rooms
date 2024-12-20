'use client';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Course from '@/components/Course';

export default function Courses() {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchCourses = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) {
      setCourses([]);
      setTotalPages(0);
      setTotal(0);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/courses?query=${encodeURIComponent(searchQuery)}&page=${page}&limit=15`
      );
      const data = await response.json();
      setCourses(data.courses);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchQuery) => fetchCourses(searchQuery), 300),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setCurrentPage(1);
    debouncedSearch(value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchCourses(query, newPage);
      document.getElementById('results-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-2 py-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl flex flex-col justify-center items-center mx-auto mb-8">
        <section className="w-full max-w-xl items-center justify-center p-2">
          <label className="input-md text-sm flex items-center gap-2 border border-base-content/10 rounded-md bg-base-content/5">
            <Search size={15} className="text-base-content/60" />
            <input
              type="text"
              className="grow bg-transparent !outline-none placeholder-base-content/60"
              placeholder="Search for courses, instructors, or locations..."
              value={query}
              onChange={handleSearch}
            />
          </label>
        </section>
        {total > 0 && !loading && (
          <div className="text-sm text-base-content/70 mt-2">
            Found {total} results
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto" id="results-top">
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            <div className="divide-y divide-base-content/10">
              {courses.map((course) => (
                <Course key={course._id} course={course} />
              ))}
              {query && courses.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-base-content/70">No courses found</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-8">
                <button
                  className="btn btn-circle btn-sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        className={`btn rounded-full btn-sm ${currentPage === pageNumber
                          ? 'bg-base-content/15'
                          : 'btn-ghost'
                          }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-2">...</span>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="btn btn-circle btn-sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}