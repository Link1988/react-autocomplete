import React, { useRef, useState } from 'react';

import { useClickOutside } from '../../hooks/useClickOutside';
import highlightString from '../../helpers/highlightString';

export type AutocompleteProps = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  loading?: boolean;
  options: Pokemon[];
  placeholder?: string;
  searchValue?: string;
  onSelect?: (selected: Pokemon) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch?: () => void;
}

export const Autocomplete = ({
  inputProps = {},
  label,
  loading = false,
  options = [],
  placeholder,
  searchValue,
  onSelect = () => {},
  onChange = () => {},
  onClearSearch = () => {},
}: AutocompleteProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => {
    setShowDropdown(false);
    setHighlightedIndex(null);
  };

  const handleOptionClick = (option: Pokemon) => {
    onSelect(option);
    setShowDropdown(false);
  };

  useClickOutside(containerRef, closeDropdown);

  return (
    <div
      ref={containerRef}
      className="autocomplete"
      role="combobox"
      aria-expanded={showDropdown}
      aria-owns="autocomplete-list"
      aria-haspopup="listbox"
    >
      {label && (
          <label className="autocomplete__label" htmlFor="autocomplete-input">
              {label}
          </label>
      )}
      <div className="autocomplete__input-wrapper">
        <input
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          aria-disabled={loading}
          aria-activedescendant={
            highlightedIndex !== null ? `autocomplete-option-${highlightedIndex}` : undefined
          }
          className="autocomplete__input"
          id="autocomplete-input"
          name="autocomplete"
          onChange={onChange}
          onFocus={openDropdown}
          placeholder={placeholder}
          type="text"
          value={searchValue}
          {...inputProps}
        />
        {searchValue && (
          <button
            type="button"
            className="autocomplete__clear"
            onClick={onClearSearch}
            aria-label="Clear search"
          >
            &times;
            </button>
        )}
      </div>
      {showDropdown && (
        <ul
          id="autocomplete-list"
          className="autocomplete__list"
          role="listbox"
        >
          {options.length > 0 ?
            options.map((option, index) => (
              <li
                key={option.name}
                id={`autocomplete-option-${index}`}
                className={`autocomplete__option ${
                  highlightedIndex === index ? 'highlighted' : ''
                  }`}
                role="option"
                aria-selected={highlightedIndex === index}
              >
                <button
                  type="button"
                  className="autocomplete__button"
                  onClick={() => {
                    handleOptionClick(option);
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightString(option.name, searchValue ?? ''),
                  }}
                />
              </li>
            ))
            : (
              <li className="autocomplete__no-results" role="option">
                No results found
              </li>
            )
          }
        </ul>
      )}
    </div>
  );
};
