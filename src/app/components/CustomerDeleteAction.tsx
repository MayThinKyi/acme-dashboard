'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { IoTrashBin } from 'react-icons/io5';

interface Props {
    customerId: number;
}
const CustomerDeleteAction = ({ customerId }: Props) => {
    const router = useRouter();
    const deleteCustomer = async (customerId: number) => {
        try {
            const { data: res } = await axios.delete(`/api/customers/${customerId}`)
            console.log(res);
            toast.success('Customer deleted successfully!')
            router.refresh();
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <button onClick={() => deleteCustomer(customerId)} className="px-2 py-2 border rounded-lg text-center">
            <IoTrashBin size={18} />
        </button>
    )
}

export default CustomerDeleteAction
