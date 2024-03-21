import React, { ChangeEvent, FunctionComponent } from 'react'

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  value?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Search: FunctionComponent<SearchProps> = ({
  placeholder,
  value,
  onChange,
  ...restProps
}): JSX.Element => {
  return (
    <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='search-input'
        {...restProps}
      />
  )
}

export default Search
