import React from 'react'
import TableComponent from '../components/TableComponent'

export default function DeadScreen() {
    return (
        <div className='flex flex-col items-center pt-6 pb-6 px-40 gap-6'>
            <h1 className='font-bold text-4xl'>Eventos muertos</h1>
            <TableComponent endpoint={'dead'} />
        </div>
    )
}
