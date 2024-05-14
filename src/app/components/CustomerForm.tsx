'use client';
import { customerSchema } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

type CustomerFormType = z.infer<typeof customerSchema>
interface Props {
    customerId?: number;
    customerForm?: CustomerFormType
}
const CustomerForm = ({ customerForm, customerId }: Props) => {
    const router = useRouter();
    const { formState: { errors, isSubmitting }, register, handleSubmit } = useForm<CustomerFormType>({
        resolver: zodResolver(customerSchema),
        values: {
            name: customerForm?.name || '',
            email: customerForm?.email || '',
            imageUrl: customerForm?.imageUrl || ''
        }
    });
    const submitHandler = async (data: CustomerFormType) => {
        try {
            if (!customerForm?.name) {
                const { data: res } = await axios.post('/api/customers', data);
                console.log('res', res)
                toast.success('Customer created successfully!')
                router.push('/customers');
                router.refresh();
            } else {
                const { data: res } = await axios.put(`/api/customers/${customerId}`, data);
                console.log('res', res)
                toast.success('Customer updated successfully!')
                router.push('/customers');
                router.refresh();
            }
        } catch (error: any) {
            console.log('error', error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(submitHandler)} className='bg-[#F9FAFB] rounded-xl p-5'>
            <div className="mb-3">
                <small className='font-semibold'>Name</small>
                <input placeholder='Enter Name...' type="text" className="mt-1 block border w-full py-2 px-3 rounded-md outline-blue-600 text-sm" {...register('name')} />
                <small className="text-red-600 font-bold">{errors.name && errors.name.message}</small>
            </div>
            <div className="mb-3">
                <small className='font-semibold'>Email</small>
                <input placeholder='Enter email address...' type="text" className="mt-1 block border w-full py-2 px-3 rounded-md outline-blue-600 text-sm" {...register('email')} />
                <small className="text-red-600 font-bold">{errors.email && errors.email.message}</small>
            </div>
            <div className="mb-3">
                <small className='font-semibold'>Image URL</small>
                <input placeholder='Enter Image URL...' type="text" className="mt-1 block border w-full py-2 px-3 rounded-md outline-blue-600 text-sm" {...register('imageUrl')} />
                <small className="text-red-600 font-bold">{errors.imageUrl && errors.imageUrl.message}</small>
            </div>
            <div className="text-end mt-8">
                <button type='submit' disabled={isSubmitting} className="rounded-lg text-sm bg-blue-600 hover:bg-blue-800 text-white py-2 px-5 text-center font-semibold">
                    {customerId ? 'Update Customer' : ' Create Customer'}
                </button>
            </div>
        </form>
    )
}

export default CustomerForm
