"use client";

import { BiSearch } from "react-icons/bi";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TutorsSearchToolbar({ value, onChange }: Props) {
  return (
    <div className="mb-8 rounded-2xl border border-[var(--card-border)] p-4 shadow-[var(--shadow-custom)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative w-full lg:flex-1">
          <BiSearch className="search-icon" />

          <input
            type="text"
            placeholder="جستجوی استاد بر اساس نام..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
}
