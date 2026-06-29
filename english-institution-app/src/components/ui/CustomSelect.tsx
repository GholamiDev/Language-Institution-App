import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export interface SelectOption {
  label?: string;
  value: string;
}

export interface CustomSelectProps {
  value: string;
  onChange: (
    value: string,
  ) => void | React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  options: SelectOption[];
  placeholder: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: CustomSelectProps) {
  const selectedOption = options.find((o) => o.value === value);

  return (
    <Listbox value={value || ""} onChange={onChange}>
      <div className="relative w-full lg:w-48">
        <Listbox.Button className="listbox-btn flex items-center justify-between w-full">
          <span className="block truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <ChevronUpDownIcon className="h-5 w-5" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-(--card-bg) py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <Listbox.Option
              value=""
              className={({ active }) =>
                `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors ${
                  active ? " text-third " : "text-secondary "
                }`
              }
            >
              {({ selected }) => (
                <div className="flex items-center justify-between">
                  <span
                    className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
                  >
                    {placeholder}
                  </span>
                  {(!value || value === "") && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                  )}
                </div>
              )}
            </Listbox.Option>

            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors ${
                    active ? "bg-(--card-bg) text-blue-700 " : "text-secondary"
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span
                      className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
                    >
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
