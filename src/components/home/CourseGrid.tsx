import { useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import paths from "src/config/path.config";
import { Course } from "src/types";
import CourseCard from "./CourseCard";

interface CourseGridProps {
  courses: Course[];
  loading?: boolean;
  viewMode?: 'grid' | 'list';
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, loading, viewMode = 'grid' }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className={
        viewMode === 'grid'
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-4"
          : "flex flex-col gap-4 py-4"
      }>
        {Array.from({ length: viewMode === 'grid' ? 8 : 4 }).map((_, index) => (
          viewMode === 'grid' ? (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden h-96 flex flex-col">
              <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse"></div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse rounded w-4/5"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse rounded w-3/5"></div>
                <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse rounded w-full"></div>
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse rounded w-1/2 mt-auto"></div>
              </div>
            </div>
          ) : (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col sm:flex-row">
              <div className="w-full sm:w-48 md:w-56 lg:w-64 h-48 sm:h-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse"></div>
              <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse rounded w-4/5"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse rounded w-3/5"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse rounded w-full"></div>
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-200% animate-pulse rounded w-1/2 mt-auto"></div>
              </div>
            </div>
          )
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card className="text-center py-12 flex justify-center items-center">
        <div className="text-gray-500 mb-4">
          <div className="text-4xl mb-2 flex justify-center">
            <Icon icon="mdi:book-open-variant" className="w-12 h-12" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy khóa học</h3>
          <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
        <Button color="primary" onClick={() => navigate(paths.course)}>
          Xem tất cả khóa học
        </Button>
      </Card>
    );
  }

  return (
    <div className={
      viewMode === 'grid'
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-4"
        : "flex flex-col gap-4 py-4 max-w-full"
    }>
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default CourseGrid;
