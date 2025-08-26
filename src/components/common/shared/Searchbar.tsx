import React, { useState, useCallback, useEffect } from "react";
import { Button, Badge, TextInput, Select, Spinner } from "flowbite-react";
import { Icon } from "@iconify/react";
import type { SearchFilters } from "src/types";
import { levels, sortOptions } from "src/constants";
import useTags from "src/hooks/useTags";
import CardBox from "./CardBox";

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" width={18} height={18}>
    <circle cx="11" cy="11" r="7" strokeWidth="2" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading = false }) => {
  const { tags: tagOptions, loading: tagLoading, error: tagError } = useTags();
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    level: [],
    tags: [],
    sortBy: "relevance",
  });

  // Xử lý tìm kiếm
  const handleSearch = useCallback(() => {
    onSearch({ ...filters, query });
  }, [filters, query, onSearch]);

  // Tìm kiếm khi có thay đổi
  useEffect(() => {
    if (query.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [query, handleSearch]);

  const handleManualSearch = () => handleSearch();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleManualSearch();
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      level: checked
        ? [...(prev.level || []), level]
        : (prev.level || []).filter((l) => l !== level),
    }));
  };

  const handleTagChange = (val: string) => {
    if (val && !filters.tags?.includes(val)) {
      setFilters(prev => ({
        ...prev,
        tags: [...(prev.tags || []), val],
      }));
    }
  };

  const handleTagRemove = (val: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== val) || [],
    }));
  };

  const clearFilters = () => {
    setQuery("");
    setFilters({
      query: "",
      level: [],
      tags: [],
      sortBy: "relevance",
    });
  };

  const activeFiltersCount = () => {
    let count = 0;
    if (filters.level && filters.level.length > 0) count++;
    if (filters.tags && filters.tags.length > 0) count++;
    if (filters.sortBy !== "relevance") count++;
    return count;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Search Bar */}
      <CardBox>
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Khóa học trực tuyến
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá hàng ngàn khóa học chất lượng cao từ các chuyên gia hàng đầu
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <div className="flex-1 relative">
            <TextInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tìm kiếm khóa học, giáo trình, tài liệu..."
              icon={SearchIcon}
              className="pl-10 pr-12 h-10 text-base "
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Button
              color="gray"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
              outline
            >
              <Icon icon="solar:filter-linear" width={18} className="mr-2" />
              Bộ lọc
              {activeFiltersCount() > 0 && (
                <Badge color="failure" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {activeFiltersCount()}
                </Badge>
              )}
            </Button>
            <Button
              color="primary"
              onClick={handleManualSearch}
              disabled={loading}
              className="px-6"
            >
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <Icon icon="solar:magnifer-linear" width={18} />
              )}
              <span className="ml-2 hidden sm:inline">Tìm kiếm</span>
            </Button>
          </div>
        </div>
      </CardBox>

      {/* Filters Panel */}
      {showFilters && (
        <CardBox className="animate-fade-in">
          <div className="p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Sort Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sắp xếp theo</label>
                <Select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                >
                  {sortOptions.map((sort) => (
                    <option key={sort.value} value={sort.value}>
                      {sort.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Level Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Cấp độ</label>
                <div className="grid grid-cols-3 gap-2">
                  {levels.map((level) => (
                    <div key={level.value} className="flex items-center space-x-2">
                      <input
                        id={level.value}
                        type="checkbox"
                        checked={filters.level?.includes(level.value) || false}
                        onChange={(e) => handleLevelChange(level.value, e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={level.value} className="text-sm">
                        {level.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tag Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                {tagLoading ? (
                  <Spinner size="sm" />
                ) : tagError ? (
                  <div className="text-red-500 text-xs">{tagError}</div>
                ) : (
                  <>
                    <Select
                      className="w-full"
                      value=""
                      onChange={e => handleTagChange(e.target.value)}
                    >
                      <option value="">+ Thêm tag...</option>
                      {tagOptions
                        .filter(tag => !filters.tags?.includes(tag._id))
                        .map(tag => (
                          <option key={tag._id} value={tag._id}>
                            {tag.name}
                          </option>
                        ))}
                    </Select>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {filters.tags?.map(tagId => {
                        const tag = tagOptions.find(t => t._id === tagId);
                        return tag ? (
                          <span
                            key={tag._id}
                            className="px-2 py-1 rounded text-xs flex items-center"
                            style={{ background: tag.color, color: "#fff" }}
                          >
                            {tag.name}
                            <button
                              type="button"
                              className="ml-1 text-white/80 hover:text-red-200"
                              onClick={() => handleTagRemove(tag._id)}
                            >
                              <Icon icon="mdi:close" width={14} height={14} />
                            </button>
                          </span>
                        ) : null;
                      })}
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <Button color="gray" outline onClick={clearFilters} className="flex-1">
                Xóa bộ lọc
              </Button>
              <Button color="primary" onClick={handleManualSearch} className="flex-1">
                Áp dụng bộ lọc
              </Button>
            </div>
          </div>
        </CardBox>
      )}
    </div>
  );
};

export default SearchBar;