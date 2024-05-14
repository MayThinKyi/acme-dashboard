'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { IoTrashBin } from 'react-icons/io5';

interface Props {
    invoiceId: number;
}
const InvoiceDeleteAction = ({ invoiceId }: Props) => {
    const router = useRouter();
    const deleteInvoice = async (customerId: number) => {
        try {
            const { data: res } = await axios.delete(`/api/invoices/${customerId}`)
            console.log(res);
            toast.success('Invoice deleted successfully!')
            router.refresh();
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <button onClick={() => deleteInvoice(invoiceId)} className="px-2 py-2 border rounded-lg text-center">
            <IoTrashBin size={18} />
        </button>
    )
}

export default InvoiceDeleteAction
