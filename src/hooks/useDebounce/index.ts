import {  useEffect, useState, useRef } from 'react';

export default function useDebounce (value: string, delay: number = 500) {
    const [debouncedValue, setDebouncedValue] = useState('')
    const timer = useRef<HTMLInputElement | number | null>(null)

    useEffect(() => {
        timer.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timer.current);
        };
    }, [value, delay]);


    return debouncedValue;
}
