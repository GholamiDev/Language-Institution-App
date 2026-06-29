"use client";

import { BiSearch } from "react-icons/bi";
import CustomSelect from "../ui/CustomSelect";

export type CourseFilters = {
  q: string;
  language: string;
  level: string;
};

export default function CourseToolbar({
  value,
  onChange,
  languages,
  levels,
}: {
  value: CourseFilters;
  onChange: (next: CourseFilters) => void;
  languages: string[];
  levels: string[];
}) {
  return (
    <div className="max-w-5xl mx-auto px-3 mb-6">
      <div className="bg-(--card-bg) border border-(--card-border) rounded-2xl p-4 flex flex-col md:grid md:grid-cols-12 gap-3 items-stretch md:items-center">
        <div className="relative w-full md:col-span-5 lg:col-span-7">
          <BiSearch className="search-icon" />
          <input
            type="text"
            placeholder="جستجو دوره..."
            value={value.q}
            onChange={(e) => onChange({ ...value, q: e.target.value })}
            className="search-input"
          />
        </div>

        <div className="grid grid-cols-2 w-full md:col-span-7 lg:col-span-5 gap-2">
          <CustomSelect
            value={value.language}
            onChange={(val) => onChange({ ...value, language: val })}
            placeholder="همه زبان ها"
            options={languages.map((l) => ({ label: l, value: l }))}
          />

          <CustomSelect
            value={value.level}
            onChange={(val) => onChange({ ...value, level: val })}
            placeholder="همه سطوح "
            options={levels.map((l) => ({ label: l, value: l }))}
          />
        </div>
      </div>
    </div>
  );
}
