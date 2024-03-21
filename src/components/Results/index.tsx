import React from 'react'
import { FunctionComponent } from 'react'

import highlightString from '../../helpers/highlightString'

type ResultsProps = {
    data?: Character[] | null
    isLoading: boolean
    search?: string
}

const Results: FunctionComponent<ResultsProps> = ({
    data,
    isLoading = false,
    search = ''
}): JSX.Element | null => {
    if (!data) {
        return null
    }

    if (!data.length && !isLoading) {
        return (
            <div className='results__not-found'>
                <h1>No results found</h1>
            </div>
        )
    }

    return (
        <ul className={`results ${data.length ? 'show' : ''}`}>
            {
                data?.map((item: Character) => {
                    const name = highlightString(item.name, search)

                    return (
                        <li key={item.id} className='results__li'>
                            <p dangerouslySetInnerHTML={{ __html:name}}></p>
                        </li>
                    )
                })
            }
        </ul>
  )
}

export default Results
