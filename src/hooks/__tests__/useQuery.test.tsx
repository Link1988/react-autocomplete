import { renderHook, act, waitFor } from '@testing-library/react';
import { useQuery } from '../useQuery';

describe('useQuery', () => {
  const originalAbortController = global.AbortController;

  beforeEach(() => {
    global.AbortController = jest.fn().mockImplementation(() => ({
      signal: {},
      abort: jest.fn(),
    }));
  });

  afterEach(() => {
    global.AbortController = originalAbortController;
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const mockQueryFn = jest.fn();
    const { result } = renderHook(() => useQuery({ queryFn: mockQueryFn }));

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should initialize loading as true when fetch is called', async () => {
    const mockQueryFn = jest.fn().mockResolvedValue({ data: 'response' });
    const { result } = renderHook(() => useQuery({ queryFn: mockQueryFn }));

    act(() => {
      result.current.fetch();
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should update data when the fetch is successful', async () => {
    const mockQueryFn = jest.fn().mockResolvedValue({ data: 'response' });
    const { result } = renderHook(() => useQuery({ queryFn: mockQueryFn }));

    act(() => {
      result.current.fetch();
    });


    await waitFor(() => {
      expect(result.current.data).toEqual({ data: 'response' });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('should set error state when the fetch fails', async () => {
    const mockQueryFn = jest.fn().mockRejectedValue(new Error('Fetch failed'));
    const { result } = renderHook(() => useQuery({ queryFn: mockQueryFn }));

    act(() => {
      result.current.fetch();
    });

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(new Error('Fetch failed'));
    });
  });

  it('should call abort and stop loading when abort is triggered', async () => {
    const mockAbort = jest.fn();
    const mockQueryFn = jest.fn().mockImplementation(() => {
      return new Promise<void>((resolve) => setTimeout(resolve, 1000));
    });

    global.AbortController = jest.fn().mockImplementation(() => ({
      signal: {},
      abort: mockAbort,
    }));

    const { result } = renderHook(() => useQuery({ queryFn: mockQueryFn }));

    act(() => {
      result.current.fetch();
    });

    act(() => {
      result.current.abort();
    });

    expect(mockAbort).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle abort during fetch', async () => {
    const mockQueryFn = jest.fn().mockImplementation(() => {
      return new Promise<void>((_, reject) => setTimeout(() => reject(new Error('Aborted')), 500));
    });

    const { result } = renderHook(() => useQuery({ queryFn: mockQueryFn }));

    act(() => {
      result.current.fetch();
    });

    act(() => {
      result.current.abort();
    });

    await waitFor(() => {
      expect(result.current.error).toEqual(new Error('Aborted'));
      expect(result.current.isLoading).toBe(false);
    });
  });
});
