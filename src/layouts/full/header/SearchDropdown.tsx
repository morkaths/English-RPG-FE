import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextInput } from 'flowbite-react';
import { Icon } from "@iconify/react";
import paths from "src/config/path.config"

interface SearchDropdownProps {
  onClose?: () => void;
  isModalOpen?: boolean;
}

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" width={18} height={18}>
    <circle cx="11" cy="11" r="7" strokeWidth="2" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SearchDropdown: React.FC<SearchDropdownProps> = ({ onClose, isModalOpen }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (onClose) onClose();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Focus input on modal open
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  // Handle search
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setRecentSearches(prev => {
      const newRecentSearches = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      return newRecentSearches;
    });
    navigate(`/courses?q=${encodeURIComponent(searchQuery)}`);
    navigate(paths.courses);
    setQuery("");
    onClose?.();
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch(query);
  };

  // Handle recent search click
  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
    handleSearch(searchQuery);
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Clear individual recent search
  const removeRecentSearch = (indexToRemove: number) => {
  setRecentSearches(prev => {
    const updated = prev.filter((_, idx) => idx !== indexToRemove);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    return updated;
  });
};

  return (
    <div ref={searchRef} className="relative w-full h-full">
      <div className="relative">
        {/* Search input */}
        <TextInput
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyPress}
          placeholder="Tìm kiếm khóa học..."
          icon={SearchIcon}
          className="pl-10 pr-12 h-10 w-full md:w-[280px] lg:w-[350px] xl:w-[400px] dark:bg-darkgray dark:text-white dark:border-gray-700"
        />
        {/* Clear search input */}
        {query && (
          <button
            type="button"
            className="absolute right-14 top-5 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-full hover:bg-gray-200 dark:border-gray-700"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
          >
            <Icon icon="mdi:close" width={16} height={16} />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div
          className={
            isMobile
              ? "relative mt-3"
              : "absolute top-[40px] mt-2 md:right-auto md:w-[400px] lg:w-[500px]"
              + " border rounded-md shadow-lg z-[60] max-h-[60vh] overflow-y-auto w-full bg-white dark:bg-darkgray dark:border-gray-700"
          }
        >

          {/* Recent Searches */}
          {(recentSearches.length > 0) && (
            <div className="p-3 border-t dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Tìm kiếm gần đây</h3>
                <Button
                  color="light"
                  size="xs"
                  className="h-6 px-2 border-none text-xs md:text-xs sm:text-[11px] xs:text-[10px]"
                  onClick={clearRecentSearches}
                >
                  Xóa tất cả
                </Button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div
                      onClick={() => handleRecentSearchClick(search)}
                      className="flex-1 flex items-center space-x-2"
                    >
                      <Icon icon="mdi:clock-outline" className="w-4 h-4 text-gray-400" width={14} height={14} />
                      <span className="text-sm">{search}</span>
                    </div>
                    <button
                      type="button"
                      className="opacity-60 hover:opacity-100 p-1 rounded group-hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(index);
                      }}
                      title="Xóa"
                    >
                      <Icon icon="mdi:close" width={14} height={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="p-3 border-t">
            <h3 className="text-sm font-medium mb-2">Khám phá</h3>
            <div className="space-y-1">
              <Link
                to="/courses?popular=true"
                className="flex items-center space-x-2 p-2  rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setTimeout(() => setIsOpen(false), 0);
                }}
              >
                <Icon icon="mdi:trending-up" width={16} height={16} className="text-green-400" />
                <span>Khóa học phổ biến</span>
              </Link>
              <Link
                to="/courses?level=A1"
                className="flex items-center space-x-2 p-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setTimeout(() => setIsOpen(false), 0);
                }}
              >
                <Icon icon="mdi:star" width={14} height={14} className="text-yellow-400" />
                <span>Dành cho người mới bắt đầu</span>
              </Link>
            </div>
          </div>

          {/* Search Button */}
          <div className="p-3 border-t">
            <Button
              color="primary"
              className="w-full dark:bg-primary dark:text-white"
              onClick={() => handleSearch(query)}
              disabled={!query.trim()}
            >
              <SearchIcon className="w-4 h-4 mr-2" />
              Tìm kiếm "{query}"
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;