import { Badge, Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import { SearchFilters, Tag } from "src/types";
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
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return null;
    }
    let displayValue: string;

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
      <Badge key={key} color="gray" className="flex items-center gap-1 rounded-full px-4 min-h-[28px]">
        {filterLabels[key] ? `${filterLabels[key]}: ` : ""}{displayValue}
        <button
          onClick={() => onClearTag(key as keyof SearchFilters)}
          className="ml-1 justify-center hover:text-red-500 bg-transparent border-none outline-none "
          aria-label={`Xóa bộ lọc ${key}`}
        >
          <Icon icon="mdi:close" className="w-3 h-3 relative top-[2px]" />
        </button>
      </Badge>
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
          <Icon icon="mdi:grid" className="w-4 h-4" />
        </Button>
        <Button
          color={viewMode === 'list' ? 'primary' : 'gray'}
          size="sm"
          onClick={() => setViewMode('list')}
          aria-label="Chế độ danh sách"
        >
          <Icon icon="mdi:view-list" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>

);

export default CourseGridHeader;