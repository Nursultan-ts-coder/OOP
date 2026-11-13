import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Autocomplete, InputAdornment } from '@mui/material';
import { useMemo } from 'react';

import { SearchTextField } from '@/shared/components/search-filter/search-filter.styled';
import { fieldClasses } from '@/shared/const/field';

import type { Restaurant } from '../../types/portal';
import type { SearchSuggestion } from '../../utils/restaurant';
import { searchSuggestions } from '../../utils/restaurant';
import {
  SearchBox,
  SuggestionDetail,
  SuggestionIcon,
  SuggestionOption,
  suggestionPaperSx,
  SuggestionText,
} from './restaurant-search.styled';

/** Suggestions shown at once; typing narrows the rest down. */
const MAX_SUGGESTIONS = 8;

const GROUP_LABEL: Record<SearchSuggestion['kind'], string> = {
  location: 'Locations',
  store: 'Restaurants',
};

interface RestaurantSearchProps {
  restaurants: Restaurant[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

/**
 * The portfolio search: the grafana pill search box with MUI Autocomplete's suggestion list. Typing
 * filters as it goes; picking a location or a store puts its name in the box.
 */
const RestaurantSearch = ({
  restaurants,
  value,
  onChange,
  label = 'Search restaurants',
  placeholder = 'Search by location or store',
}: RestaurantSearchProps) => {
  const options = useMemo(
    () => searchSuggestions(restaurants, value).slice(0, MAX_SUGGESTIONS),
    [restaurants, value]
  );

  return (
    <SearchBox>
      <Autocomplete<SearchSuggestion, false, false, true>
        freeSolo
        options={options}
        // The options are already the matches for the text.
        filterOptions={(list) => list}
        groupBy={(option) => GROUP_LABEL[option.kind]}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
        isOptionEqualToValue={(option, selected) => option.label === selected.label}
        slotProps={{ paper: { sx: suggestionPaperSx } }}
        inputValue={value}
        onInputChange={(_, next) => onChange(next)}
        renderOption={({ key, ...props }, option) => (
          <SuggestionOption key={key} {...props}>
            <SuggestionIcon>
              {option.kind === 'location' ? <PlaceOutlinedIcon /> : <StorefrontOutlinedIcon />}
            </SuggestionIcon>
            <SuggestionText>
              {option.label}
              <SuggestionDetail>{option.detail}</SuggestionDetail>
            </SuggestionText>
          </SuggestionOption>
        )}
        renderInput={(params) => (
          <SearchTextField
            {...params}
            className={fieldClasses.pill}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            slotProps={{
              htmlInput: { ...params.inputProps, 'aria-label': label },
              input: {
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </SearchBox>
  );
};

export default RestaurantSearch;
