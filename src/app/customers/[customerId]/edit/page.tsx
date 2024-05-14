import CustomerForm from '@/app/components/CustomerForm';
import React from 'react'
import prisma from '../../../../../prisma/db';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
    params: {
        customerId: string;
    }
}
export const metadata: Metadata = {
    title: 'Edit Customer'
}
const CustomerEditPage = async ({ params: { customerId } }: Props) => {
    const customerForm = await prisma.customer.findUnique({ where: { id: Number(customerId) } })
    if (!customerForm) notFound();
    return (
        <div className='py-5'>
            <h1 className="mt-4 text-2xl text-slate-900 font-bold mb-6">Customers / Edit Customer</h1>
            <CustomerForm customerId={Number(customerId)} customerForm={customerForm} />
        </div>
    )
}

export default CustomerEditPage
