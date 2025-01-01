import React, { useState, useCallback, useEffect } from 'react'

import { Autocomplete } from './components/Autocomplete/Autocomplete';
import { useQuery } from './hooks/useQuery';
import useDebounce from './hooks/useDebounce';

import { fetchPokemons } from './api/fetchPokemons';
import type { QueryFnResponseType, QueryFnType } from './api/fetchPokemons';
import { mapPokemons } from './mappers/mapPokemons';

function App() {
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<null | Pokemon>(null);

  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, fetch } = useQuery<QueryFnType, QueryFnResponseType>({
      queryFn: fetchPokemons,
  });

  const onChangeSearch = useCallback((event: any) => {
    setSearch(event.target.value)
  }, [setSearch])

  const onSelect = (selected: Pokemon) => {
    setSelected(selected);
    setSearch(selected.name);
  };

  const handleClear = () => {
    setSelected(null);
    setSearch('')
  };

  useEffect(() => {
    fetch({ body: JSON.stringify({ search: debouncedSearch }) });
  }, [debouncedSearch])

  const options = (data || []).map(mapPokemons);

  return (
    <div className="container" data-testid="app">
      <Autocomplete
        searchValue={search}
        label="Select a pokemon"
        loading={isLoading}
        onSelect={onSelect}
        onChange={onChangeSearch}
        onClearSearch={handleClear}
        options={options}
        placeholder="Find a pokemon..."
      />
      {
        selected ? (
          <div className='container__selected'>
            <h4>Selected Pokemon:</h4>
            <p>Name: {selected.name}</p>
            <p>Weight: {selected.weight}</p>
            <p>Height: {selected.height}</p>
          </div>
        ) : null
      }
    </div>
  )
}

export default App
