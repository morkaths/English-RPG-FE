
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Spinner, Alert, Card } from "flowbite-react";
import type { SearchFilters } from "src/types";
import paths from "src/config/path.config";
import useTags from "src/hooks/useTags";
import useCourses from "src/hooks/useCourses";
import CourseGrid from "src/components/courses/CourseGrid";
import CourseSearch from "src/components/courses/CourseSearch";
import CourseGridHeader from "src/components/courses/CourseGridHeader";

const CoursesPage = () => {
  // Router
  const [searchParams, setSearchParams] = useSearchParams();
  // Hooks
  const { tags: tagOptions, error: tagError } = useTags();
  const { courses, loading, error, searchCourses } = useCourses();
  // State UI
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    level: [],
    tags: [],
    sortBy: "relevance"
  });

  // Search courses based on filters
  const handleSearch = useCallback((filters: SearchFilters) => {
    const url = paths.courseSearch(filters);
    const params = url.split("?")[1] || "";
    setSearchParams(new URLSearchParams(params));
  }, [setSearchParams]);

  // Handle clear tag filter
  const handleClearTag = useCallback((key: keyof SearchFilters, value?: string) => {
    if (Array.isArray(filters[key])) {
      setFilters({
        ...filters,
        [key]: (filters[key] as string[]).filter((v) => v !== value),
      });
    } else {
      setFilters({ ...filters, [key]: "" });
    }
    handleSearch({ ...filters, [key]: "" });
  }, [filters, handleSearch]);

  // Update query state when searchParams change
  useEffect(() => {
    const q = searchParams.get('query') || '';
    const level = searchParams.getAll('level');
    const tags = searchParams.getAll('tags');
    const sortBy = searchParams.get('sortBy') || 'relevance';

    const newFilters: SearchFilters = {
      query: q,
      level,
      sortBy,
      tags,
    };
    setQuery(q);
    setFilters(newFilters);
    searchCourses(newFilters);
  }, [searchParams, searchCourses]);

  return (
    <div className="grid grid-cols-12 gap-30">

      {/* Header */}
      <div className="col-span-12">
        <CourseSearch onSearch={handleSearch} loading={false} />
      </div>

      {/* Main Content */}
      <div className="col-span-12">

        {/* Error Alert */}
        {error && (
          <Alert color="failure" className="mb-4">
            <span className="font-semibold">Đã xảy ra lỗi: </span>
            {typeof error === "string" ? error : "Không thể tải dữ liệu các khóa học. Vui lòng thử lại sau."}
          </Alert>
        )}
        {tagError && (
          <Alert color="failure" className="mb-4">
            <span className="font-semibold">Đã xảy ra lỗi: </span>
            {typeof tagError === "string" ? tagError : "Không thể tải dữ liệu các tag. Vui lòng thử lại sau."}
          </Alert>
        )}

        {/* Search Results */}
        {query && (
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-semibold mb-2">
              Kết quả tìm kiếm cho "{query}"
            </h2>
            <p className="text-muted-foreground">
              Tìm thấy {courses.length} khóa học phù hợp
            </p>
          </Card>
        )}

        {/* Course Grid Header */}
        <CourseGridHeader
          totalCourses={courses.length}
          filters={filters}
          tagOptions={tagOptions}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onClearTag={handleClearTag}
        />

        {/* Course List */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner size="xl" aria-label="Đang tải..." />
          </div>
        ) : (
          <CourseGrid
            courses={courses}
            tags={tagOptions}
            loading={loading}
            viewMode={viewMode}
          />
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
