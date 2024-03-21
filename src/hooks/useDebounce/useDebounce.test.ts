import { renderHook, waitFor } from '@testing-library/react';
import useDebounce from '.';

jest.useFakeTimers();

describe('useDebounce', () => {
    afterEach(() => {
        jest.clearAllTimers();
    });

    it('should return debounced value after delay', async () => {
        const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
            initialProps: { value: '', delay: 500 },
        });

        expect(result.current).toBe('');

        rerender({ value: 'hello', delay: 500 });

        jest.advanceTimersByTime(500);

        await waitFor(() => {
            expect(result.current).toBe('hello');
        })

        // change value and delay
        rerender({ value: 'world', delay: 1000 });

        // not enough time to trigger debouncing
        jest.advanceTimersByTime(500);

        await waitFor(() => {
            expect(result.current).toBe('hello');
        })

        // add another 500 to received to get the updates value
        jest.advanceTimersByTime(500);
        await waitFor(() => {
            expect(result.current).toBe('world');
        })
    });

    it('should clear timer on unmount', async () => {
        jest.spyOn(global, 'clearTimeout')

        const { unmount } = renderHook(({ value, delay }) => useDebounce(value, delay), {
            initialProps: { value: '', delay: 500 },
        });

        unmount();

        await waitFor(() => {
            expect(clearTimeout).toHaveBeenCalledTimes(1);
        })
    });
});
