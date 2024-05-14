'use client';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BiPlus, BiSearch } from 'react-icons/bi'

const CustomerActions = () => {
    const router = useRouter();
    return (
        <div className='flex items-center  gap-4'>
            <div className='w-[80%] py-2 px-4 flex items-center border rounded-lg '>
                <BiSearch className='text-slate-600' size={18} />
                <input onChange={(e) => {
                    if (e.target.value.trim().length > 0) router.push(`/customers?search=${e.target.value}`)
                    else router.push('/customers')
                }} placeholder='Search customers....' className='sm:ms-2 text-sm outline-none' />
            </div>
            <div className='w-[20%] cursor-pointer py-2 px-2 text-sm bg-blue-600 text-white rounded-lg '>
                <Link href={'/customers/create'} className='flex items-center justify-center gap-2'>
                    <p className='hidden lg:inline'>Create Customer</p>
                    <BiPlus size={20} />
                </Link>
            </div>
        </div>
    )
}

export default CustomerActions
