import { renderHook, waitFor } from '@testing-library/react';
import useGet from '.';

describe('useGet', () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            data: {
                characters: {
                    results: [{
                        id: '1',
                        name: 'Rick'
                    }]
                }
            }
        }),
    }));

    // Clear fetch mock after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return initial state when search is empty', () => {
        const { result } = renderHook(() => useGet(''));

        expect(result.current).toEqual({
            data: null,
            isLoading: true,
            hasError: false,
        });
    });

    it('should fetch data with valid search', async () => {
        const { result } = renderHook(() => useGet('Rick'));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.hasError).toBe(false);
            expect(result.current.data).toEqual([
                {
                    id: '1',
                    name: 'Rick'
                }
            ]);
        })
    });

    it('should return state with error', async () => {
        // Mock fetch to reject the promise
        global.fetch.mockImplementationOnce(() => Promise.reject('Fetch error'));

        const { result } = renderHook(() => useGet('InvalidSearch'));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.hasError).toBe(true);
            expect(result.current.data).toBe(null);
        })
    });
});
