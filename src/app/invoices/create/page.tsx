import InvoiceForm from '@/app/components/InvoiceForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Create Invoice'
}
const CreateInvoicePage = () => {
    return (
        <div className='py-5'>
            <h1 className="mt-4 text-2xl text-slate-900 font-bold mb-6">Invoices / Create Invoice</h1>
            <InvoiceForm />
        </div>
    )
}

export default CreateInvoicePage
