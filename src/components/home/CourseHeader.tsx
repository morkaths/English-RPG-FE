import React from 'react';
import SearchBar from '../common/shared/Searchbar';

interface CoursesHeaderProps {
  loading: boolean;
  onSearch: (filters: any) => void;
}

const CoursesHeader: React.FC<CoursesHeaderProps> = ({ loading, onSearch }) => {
  return (
    <>
      {/* Search Bar */}
      <SearchBar onSearch={onSearch} loading={loading} />
    </>
  );
};

export default CoursesHeader;