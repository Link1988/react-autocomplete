import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import { useQuery } from '../hooks/useQuery';

jest.mock('../hooks/useQuery', () => ({
  useQuery: jest.fn(),
}));
jest.mock('../api/fetchPokemons', () => ({
  fetchPokemons: jest.fn(),
}));

// Mocking a response for the `useQuery` hook
const mockFetchPokemons = (searchTerm: string) => {
  return [
    { name: 'Pikachu', weight: 60, height: 4 },
    { name: 'Charmander', weight: 85, height: 6 },
    { name: 'Bulbasaur', weight: 69, height: 7 }
  ].filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
};

describe('App Component', () => {
  afterEach(cleanup);
  beforeEach(() => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockFetchPokemons(''),
      isLoading: false,
      fetch: jest.fn(),
    }));
  });

  it('should render the app with the autocomplete component', () => {
    render(<App />);

    expect(screen.getByTestId('app')).toBeInTheDocument();
    expect(screen.getByLabelText('Select a pokemon')).toBeInTheDocument();
  });

  it('should update search value when start a search', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Find a pokemon...');
    fireEvent.change(input, { target: { value: 'Pikachu' } });

    expect(screen.getByDisplayValue('Pikachu')).toBeInTheDocument();
  });
});
