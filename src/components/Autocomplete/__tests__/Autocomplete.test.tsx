import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Autocomplete, AutocompleteProps } from '../Autocomplete';

describe('Autocomplete', () => {
  afterEach(cleanup);

  const mockOptions = [
    { name: 'Pikachu', weight: 69, height: 69 },
    { name: 'Charmander', weight: 69, height: 69 },
    { name: 'Bulbasaur', weight: 69, height: 69 },
  ];

  const renderComponent = (props: Partial<AutocompleteProps> = {}) => {
    const defaultProps: AutocompleteProps = {
      options: mockOptions,
      onSelect: jest.fn(),
      onChange: jest.fn(),
      onClearSearch: jest.fn(),
      ...props,
    };
    render(<Autocomplete {...defaultProps} />);
    return defaultProps;
  };

  it('should render the component with a label and input', () => {
    const label = 'Select a pokemon';
    const placeholder = 'Find a pokemon...';

    renderComponent({ label, placeholder});

    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('should display options when input is focused', () => {
    renderComponent();

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    mockOptions.forEach(option => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('should call onSelect when an option is clicked', () => {
    const mockOnSelect = jest.fn();
    renderComponent({ onSelect: mockOnSelect });

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    const optionButton = screen.getByText('Pikachu');
    fireEvent.click(optionButton);

    expect(mockOnSelect).toHaveBeenCalledWith({
      name: 'Pikachu',
      height: 69,
      weight: 69,
    });
  });

  it('should display "No results found" if search is empty', () => {
    renderComponent({ options: [], searchValue: 'Unknown' });

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('should call onClearSearch when the clear button is clicked', () => {
    const mockOnClearSearch = jest.fn();
    renderComponent({ searchValue: 'Pikachu', onClearSearch: mockOnClearSearch });

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    fireEvent.click(clearButton);

    expect(mockOnClearSearch).toHaveBeenCalled();
  });
});
