import { fireEvent, renderHook } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

describe('useOnClickOutside(', () => {

  it('should call the callback when a clicking outside the element ref', () => {
    const containerRef = { current: document.createElement('div') };
    const mockFn = jest.fn();

    renderHook(() => {
      useClickOutside(containerRef, mockFn);
    });

    expect(mockFn).toHaveBeenCalledTimes(0);

    fireEvent.click(document);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should not call the handler when clicking inside the element', () => {
    const containerRef = { current: document.createElement('div') };
    const mockFn = jest.fn();

    renderHook(() => {
      useClickOutside(containerRef, mockFn);
    });

    fireEvent.click(containerRef.current);

    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
