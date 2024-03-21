import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Results from '.';

jest.mock('../../helpers/highlightString', () => {
  return jest.fn((text, _) => text);
});

describe('Results', () => {
  const mockData = [
    { id: 1, name: 'Rick Sanchez' },
    { id: 2, name: 'Morty Smith' },
  ];

  it('renders no results found message correctly', () => {
    const { getByText } = render(<Results data={[]} isLoading={false} />);
    const noResults = getByText('No results found');

    expect(noResults).toBeInTheDocument();
  });

  it('renders results list correctly', () => {
    const searchQuery = 'Rick';
    const { getByText } = render(<Results data={mockData} isLoading={false} search={searchQuery} />);

    // Check if items in the list are rendered correctly
    expect(getByText('Rick Sanchez')).toBeInTheDocument();
    expect(getByText('Morty Smith')).toBeInTheDocument();
  });
});
