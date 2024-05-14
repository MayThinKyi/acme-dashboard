import React from 'react'
import CustomerActions from '../components/CustomerActions'
import prisma from '../../../prisma/db'
import { BiEdit } from 'react-icons/bi';
import Link from 'next/link';
import CustomerDeleteAction from '../components/CustomerDeleteAction';
import AppPagination from '../components/AppPagination';
import { Metadata } from 'next';

interface Props {
    searchParams: {
        page?: string;
        search?: string;
    }
}
export const metadata: Metadata = {
    title: 'Customers'
}
const CustomersPage = async ({ searchParams: { page, search } }: Props) => {
    const cutomersCount = await prisma.customer.count({
        where: {
            name: {
                contains: search || undefined,
            }
        }
    });
    const customers = await prisma.customer.findMany({
        skip: (Number(page || 1) - 1) * 5,
        take: 5,
        where: {
            name: {
                contains: search || undefined,
            }
        },
        include: { invoices: true }
    });
    const customersWithAmount = customers.map((customer) => {
        let totalPending = 0;
        let totalPaid = 0;
        customer.invoices.map((invoice) => {
            invoice.status === 'PENDING' ? totalPending += Number(invoice.amount)
                : totalPaid += Number(invoice.amount)
        })
        return { ...customer, totalPaid, totalPending }
    })

    return (
        <div className='py-5'>
            <h1 className="text-2xl font-bold mb-6">Customers</h1>
            <CustomerActions />
            <div className='bg-[#F9FAFB] mt-8 py-4 px-2 rounded-xl'>
                <div className="mb-4 grid grid-cols-6 gap-10 text-center">
                    <p className="text-[15px] text-slate-800 font-bold">Name</p>
                    <p className="text-[15px] text-slate-800 font-bold">Email	</p>
                    <p className="text-[15px] text-slate-800 font-bold">Total Invoices	</p>
                    <p className="text-[15px] text-slate-800 font-bold">Total Pending	</p>
                    <p className="text-[15px] text-slate-800 font-bold">Total Paid</p>
                    <p className="text-[15px] text-slate-800 font-bold w-[100px]"></p>
                </div>
                <div className="rounded-xl bg-white border overflow-hidden">
                    {customersWithAmount.map((customer) => {
                        return <div key={customer.id} className=' border-b grid grid-cols-6 gap-10 p-3 cursor-pointer text-black h-max'>
                            <div className="flex items-center gap-1">
                                <img className='w-[30px] h-[30px] rounded-full border' src={customer.imageUrl} alt={customer.name} />
                                <p className="text-[13px]  text-wrap text-slate-800 ">{customer.name}</p>
                            </div>
                            <p className="text-[13px] text-wrap text-slate-800 ">{customer.email}	</p>
                            <p className="text-[14px] text-slate-800
                             text-center">{customer.invoices.length}</p>
                            <p className="text-[14px] text-slate-800 text-center">${customer.totalPending}</p>
                            <p className="text-[14px] text-slate-800 text-center">${customer.totalPaid}</p>
                            <p className="text-[14px] text-slate-800 flex items-center justify-center gap-2">
                                <button className="px-2 py-2 border rounded-lg text-center">
                                    <Link href={`/customers/${customer.id}/edit`}>
                                        <BiEdit size={20} />
                                    </Link>
                                </button>
                                <CustomerDeleteAction customerId={customer.id} />
                            </p>
                        </div>
                    })}
                </div>
            </div>
            <AppPagination currentPage={Number(page) || 1} totalPage={Math.ceil(cutomersCount / 5)} />
        </div>
    )
}

export default CustomersPage
export const dynamic = 'force-dynamic';
