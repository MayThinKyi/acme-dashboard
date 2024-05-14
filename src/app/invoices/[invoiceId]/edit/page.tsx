import React from 'react'
import prisma from '../../../../../prisma/db';
import { notFound } from 'next/navigation';
import InvoiceForm from '@/app/components/InvoiceForm';
import { Metadata } from 'next';

interface Props {
    params: {
        invoiceId: string;
    }
}
export const metadata: Metadata = {
    title: 'Edit Invoice'
}
const InvoiceEditPage = async ({ params: { invoiceId } }: Props) => {
    const invoiceForm = await prisma.invoice.findUnique({ where: { id: Number(invoiceId) } })
    if (!invoiceForm) notFound();
    return (
        <div className='py-5'>
            <h1 className="mt-4 text-2xl text-slate-900 font-bold mb-6">Invoices / Edit Invoice</h1>
            <InvoiceForm invoiceId={Number(invoiceId)} invoiceForm={invoiceForm} />
        </div>
    )
}


export default InvoiceEditPage
