import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import type { SearchFilters, Tag } from "src/types";
import { sortOptions } from "src/constants";

interface CourseGridHeaderProps {
  totalCourses: number;
  filters: SearchFilters;
  tagOptions?: Tag[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onClearTag: (key: keyof SearchFilters) => void;
}

const filterLabels: Record<string, string> = {
  sortBy: "Sắp xếp",
  level: "Trình độ",
  tags: "Tag",
};

const renderFilterBadges = (
  filters: SearchFilters,
  tagOptions: Tag[],
  onClearTag: (key: keyof SearchFilters) => void
) => {
  return Object.entries(filters).map(([key, value]) => {
    // Skip empty or undefined filters
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return null;
    }
    let displayValue: string;

    // Special handling for tags and sort by
    if (key === "tags" && Array.isArray(value)) {
      displayValue = value
        .map((id) => tagOptions.find((tag) => tag._id === id)?.name || id)
        .join(", ");
    } else if (Array.isArray(value)) {
      displayValue = value.join(", ");
    } else if (key === "sortBy") {
      displayValue = sortOptions.find(opt => opt.value === value)?.label || value;
    } else {
      displayValue = String(value);
    }

    return (
      <span
        key={key}
        className="flex items-center gap-1 rounded-full px-4 min-h-[28px] py-1 text-gray-700 bg-gray-300/40 dark:text-gray-200 dark:bg-gray-700/60"
        style={{ fontSize: 14 }}
      >
        {filterLabels[key] ? `${filterLabels[key]}: ` : ""}
        {displayValue}
        <button
          type="button"
          className="ml-1 hover:text-red-500"
          onClick={() => onClearTag(key as keyof SearchFilters)}
          aria-label={`Xóa bộ lọc ${key}`}
        >
          <Icon icon="mdi:close" className="w-4 h-4" />
        </button>
      </span>
    );
  });
};

const CourseGridHeader: React.FC<CourseGridHeaderProps> = ({
  totalCourses,
  filters,
  tagOptions = [],
  viewMode,
  setViewMode,
  onClearTag,
}) => (
  <div className="mb-6">
    {/* Render filter badges */}
    <div className="flex flex-wrap gap-2 mt-3">
      {renderFilterBadges(filters, tagOptions, onClearTag)}
    </div>
    {/* Total & View mode */}
    <div className="flex flex-row items-center justify-between gap-4 mb-6">
      <div className="flex flex-row items-center gap-2 flex-1 min-w-0">
        <span className="text-gray-600 flex-shrink-0">
          {totalCourses} khóa học
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          color={viewMode === 'grid' ? 'primary' : 'gray'}
          size="sm"
          onClick={() => setViewMode('grid')}
          aria-label="Chế độ lưới"
        >
          <Icon icon="tabler:grid-dots" className="w-4 h-4" />
        </Button>
        <Button
          color={viewMode === 'list' ? 'primary' : 'gray'}
          size="sm"
          onClick={() => setViewMode('list')}
          aria-label="Chế độ danh sách"
        >
          <Icon icon="tabler:list-details" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>

);

export default CourseGridHeader;