import { useState, useEffect } from 'react'

type Response = {
    data: Character[] | null
    isLoading: boolean
    hasError: boolean
}

const initialState = {
    data: null,
    isLoading: true,
    hasError: false
}

export default function useGet(search: string = '') {
    const cleanSearch:string = search.replace(/\s\s+/g, ' ').trim()

    const [apiState, setApiState] = useState<Response>(initialState)

    useEffect(() => {
        if (cleanSearch.length) {
            setApiState((prev) => ({...prev, isLoading: true }));

            const queryBody = JSON.stringify({
                query: `
                    query Characters($filter: FilterCharacter) {
                        characters(filter: $filter) {
                            results {
                                id
                                name
                            }
                        }
                    }
                `,
                variables: {
                    filter: {
                        name: cleanSearch
                    },
                },
            })

            fetch('https://rickandmortyapi.graphcdn.app/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: queryBody,
            })
            .then((response) => response.json())
            .then((response) => setApiState((prev) => ({...prev, data: response.data.characters.results })))
            .catch(() => setApiState((prev) => ({...prev, hasError: true })))
            .finally(() => setApiState((prev) => ({...prev, isLoading: false })))
        } else if (!cleanSearch.length) {
            setApiState(initialState)
        }
    }, [search])

    return apiState
}