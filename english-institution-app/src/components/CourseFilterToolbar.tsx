"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Listbox, Transition } from "@headlessui/react";
import CustomSelect from "./ui/CustomSelect";

type Filters = {
  search: string;
  level: string;
  language: string;
  sort: string;
};

type Props = {
  levels: string[];
  languages: string[];
  onFilterChange: (filters: Filters) => void;
};

export default function CoursesFilterToolbar({
  levels,
  languages,
  onFilterChange,
}: Props) {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange({
        search,
        level,
        language,
        sort,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, level, language, sort, onFilterChange]);

  const clearFilters = () => {
    setSearch("");
    setLevel("");
    setLanguage("");
    setSort("");
  };

  return (
    <div
      className="mb-8 rounded-2xl border 
    border-(--card-border) shadow-(--shadow-custom) p-4 "
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative w-full lg:flex-1">
          <BiSearch className="search-icon" />
          <input
            type="text"
            placeholder="جستجو دوره..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <CustomSelect
          value={level}
          onChange={setLevel}
          placeholder="همه سطوح"
          options={levels.map((l) => ({ label: l, value: l }))}
        />

        <CustomSelect
          value={language}
          onChange={setLanguage}
          placeholder="همه زبان ها"
          options={languages.map((l) => ({ label: l, value: l }))}
        />

        <CustomSelect
          value={sort}
          onChange={setSort}
          placeholder="مرتب سازی"
          options={[
            { label: "گرانترین", value: "price_desc" },
            { label: "ارزانترین", value: "price_asc" },
            { label: "جدیدترین", value: "newest" },
          ]}
        />

        <button
          onClick={clearFilters}
          className="white-btn my-btn dark:blue-btn"
        >
          پاک کردن
        </button>
      </div>
    </div>
  );
}
