'use client';

import { Customer, Status } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BsClock } from 'react-icons/bs';
import { FaCheck } from "react-icons/fa6";
import { Decimal } from '@prisma/client/runtime/library';

type invoiceFormType = {
    id: number;
    amount: Decimal;
    status: Status;
    customerId: number;
    createdAt: Date;
    updatedAt: Date;
}
interface Props {
    invoiceId?: number;
    invoiceForm?: invoiceFormType
}
const InvoiceForm = ({ invoiceForm, invoiceId }: Props) => {
    const [customerId, setCustomerId] = useState(invoiceForm?.customerId || 'null');
    const [amount, setAmount] = useState(invoiceForm?.amount || 0);
    const { data: customers, isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: () => axios.get<Customer[]>('/api/customers')
    })
    const [status, setStatus] = useState(invoiceForm?.status || 'PENDING');
    const router = useRouter();

    const submitHandler = async () => {
        try {
            if (invoiceId) {
                console.log('updaitng');
                //Update Invoice
                const { data: res } = await axios.put(`/api/invoices/${invoiceId}`, { amount: Number(amount), status, customerId: Number(customerId) });
                console.log(res);
                toast.success('Invoice updated successfuly!');
                router.push('/invoices');
                router.refresh();
            } else {
                //Create Invoice
                const { data: res } = await axios.post('/api/invoices', { amount, status, customerId: Number(customerId) });
                console.log(res);
                toast.success('Invoice created successfuly!');
                router.push('/invoices');
                router.refresh();
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='bg-[#F9FAFB] rounded-xl p-5'>
            <div className="mb-3">
                <small className='font-semibold'>Select Customers <small className="text-red-600 font-bold">(Required)</small></small>
                <select className="mt-1 block border w-full py-2 px-3 rounded-md outline-blue-600 text-sm" value={customerId} onChange={(e) => setCustomerId(e.target.value)} >
                    <option value="null">Select a customer </option>
                    {customers?.data.map((customer) => {
                        return <option key={customer.id} id={customer.id.toString()} value={customer.id} >{customer.name}</option>
                    })}
                </select>

            </div>
            <div className="mb-3">
                <small className='font-semibold'>Choose an amount</small>
                <input placeholder='Enter USD amount' type="text" className="mt-1 block border w-full py-2 px-3 rounded-md outline-blue-600 text-sm" value={Number(amount)} onChange={(e) => setAmount(Number(e.target.value))} />

            </div>
            <div className="mb-3">
                <small className='font-semibold'>Set the invoice status</small>
                <div className="mt-1 w-full flex items-center gap-4 bg-white border   py-2 px-3 rounded-md outline-blue-600 text-sm" >
                    <div onClick={() => setStatus('PENDING')} className="cursor-pointer flex items-center gap-1">
                        <input type="radio" value={'PENDING'} checked={status === 'PENDING'} />
                        <div className="py-1 px-4 rounded-xl flex items-center gap-2 bg-[#F3F4F6]">
                            <p className='text-[12px] font-bold text-zinc-600'>Pending</p>
                            <BsClock />
                        </div>
                    </div>
                    <div onClick={() => setStatus('PAID')} className="cursor-pointer flex items-center gap-1">
                        <input type="radio" value={'PAID'} checked={status === 'PAID'} />
                        <div className="py-1 px-4 rounded-xl text-white flex items-center gap-2 bg-green-600">
                            <p className='text-[12px] font-bold  '>Paid</p>
                            <FaCheck />
                        </div>
                    </div>
                </div>

            </div>
            <div className="text-end mt-8">
                <button onClick={submitHandler} type='submit' className="rounded-lg text-sm bg-blue-600 hover:bg-blue-800 text-white py-2 px-5 text-center font-semibold">
                    {invoiceId ? 'Update Invoice' : ' Create Invoice'}
                </button>
            </div>
        </div>
    )
}

export default InvoiceForm
