import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Search from '.';

describe('Search', () => {
  it('render component', () => {
    const placeholder = 'Search here';
    const value = 'test';
    const onChange = jest.fn();

    const { getByPlaceholderText } = render(
      <Search placeholder={placeholder} value={value} onChange={onChange} />
    );

    const input = getByPlaceholderText(placeholder);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);

    // fire onChange
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(onChange).toHaveBeenCalled();
  });
});
