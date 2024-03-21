import { useState, useCallback } from 'react'
import './App.css'

import Search from '@components/Search';
import Results from '@components/Results';

import useGet from '@hooks/useGet';
import useDebounce from '@hooks/useDebounce';

function App() {
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useGet(debouncedSearch);

  const onChangeSearch = useCallback((event: any) => {
    setSearch(event.target.value)
  }, [setSearch])


  return (
    <div className="container">
      <Search
        placeholder='Seach'
        value={search}
        onChange={onChangeSearch}
      />
      <Results
        data={data}
        isLoading={isLoading}
        search={debouncedSearch}
      />
    </div>
  )
}

export default App
