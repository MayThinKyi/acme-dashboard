'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { BiPlus, BiSearch } from 'react-icons/bi';

const InvoiceActions = () => {
    const router = useRouter();

    return (
        <div className='flex items-center  gap-4'>
            <div className='w-[80%] py-2 px-4 flex items-center border rounded-lg '>
                <BiSearch className='text-slate-600' size={18} />
                <input placeholder='Search invoices....' className='sm:ms-2 text-sm outline-none' onChange={(e) => {
                    if (e.target.value.trim().length > 0) router.push(`/invoices?search=${e.target.value}`)
                    else router.push('/invoices')
                }} />
            </div>
            <div className='w-[20%] cursor-pointer py-2 px-2 text-sm bg-blue-600 text-white rounded-lg '>
                <Link href={'/invoices/create'} className='flex items-center justify-center gap-2'>
                    <p className='hidden lg:inline'>Create Invoice</p>
                    <BiPlus size={20} />
                </Link>
            </div>
        </div>
    )
}

export default InvoiceActions
