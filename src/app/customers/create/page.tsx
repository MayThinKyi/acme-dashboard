import CustomerForm from '@/app/components/CustomerForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Create Customer'
}
const CreateCustomerPage = () => {
    return (
        <div className='py-5'>
            <h1 className="mt-4 text-2xl text-slate-900 font-bold mb-6">Customers / Create Customer</h1>
            <CustomerForm />
        </div>
    )
}

export default CreateCustomerPage
