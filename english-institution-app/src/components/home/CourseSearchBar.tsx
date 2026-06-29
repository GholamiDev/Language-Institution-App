"use client";

import { BiSearch } from "react-icons/bi";

type CourseSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const CourseSearchBar = ({ value, onChange }: CourseSearchBarProps) => {
  return (
    <div className="relative w-full max-w-xl">
      <BiSearch className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="جستجو در عنوان دوره‌ها..."
        className="search-input"
      />
    </div>
  );
};

export default CourseSearchBar;
