import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment } from '@mui/material';
import debounce from 'lodash/debounce';
import React, { useMemo, useState } from 'react';

import { fieldClasses } from '@/shared/const/field';

import { SearchTextField } from './search-filter.styled';

const DEBOUNCE_MS = 500;

interface SearchFilterProps {
  label?: string;
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  debounceMs?: number;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  label = 'Search by name',
  value,
  onChange,
  placeholder = '',
  name = 'search',
  debounceMs = DEBOUNCE_MS,
}) => {
  const id = `${name}-input`;
  const [localValue, setLocalValue] = useState(value || '');

  const debouncedOnChange = useMemo(
    () =>
      debounce((searchValue: string) => {
        onChange(searchValue);
      }, debounceMs),
    [onChange, debounceMs]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  React.useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value || '');
    }
  }, [value]);

  React.useEffect(() => () => debouncedOnChange.cancel(), [debouncedOnChange]);

  return (
    <FormControl variant="outlined" sx={{ minWidth: 168 }}>
      <SearchTextField
        id={id}
        className={fieldClasses.pill}
        name={name}
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder || label}
        variant="outlined"
        size="small"
        // No visible label here, and a placeholder is not an accessible name.
        slotProps={{ htmlInput: { 'aria-label': label } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default SearchFilter;
