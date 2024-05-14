import React from 'react'
import InvoiceActions from '../components/InvoiceActions'
import Link from 'next/link'
import { BiEdit } from 'react-icons/bi'
import prisma from '../../../prisma/db'
import AppPagination from '../components/AppPagination'
import AppStatus from '../components/AppStatus'
import InvoiceDeleteAction from '../components/InvoiceDeleteAction'
import { Metadata } from 'next'

interface Props {
    searchParams: {
        search?: string;
        page?: string;
    }
}
export const metadata: Metadata = {
    title: 'Invoices'
}
const InvoicesPage = async ({ searchParams: { search, page } }: Props) => {
    const invoiceCount = await prisma.invoice.count({
        where: {
            customer: {
                name: {
                    contains: search
                }
            }
        }
    })
    const invoices = await prisma.invoice.findMany({
        skip: (Number(page || 1) - 1) * 5,
        take: 5,
        where: {
            customer: {
                name: {
                    contains: search
                }
            }
        },
        include: { customer: true }
    })
    return (
        <div className='py-5'>
            <h1 className="text-2xl font-bold mb-6">Invoices</h1>
            <InvoiceActions />
            <div className='bg-[#F9FAFB] mt-8 py-4 px-2 rounded-xl'>
                <div className="mb-4 grid grid-cols-6 gap-10 text-center">
                    <p className="text-[15px] text-slate-800 font-bold">Customer</p>
                    <p className="text-[15px] text-slate-800 font-bold">Email	</p>
                    <p className="text-[15px] text-slate-800 font-bold">Amount</p>
                    <p className="text-[15px] text-slate-800 font-bold">Date</p>
                    <p className="text-[15px] text-slate-800 font-bold">Status</p>
                    <p className="text-[15px] text-slate-800 font-bold w-[100px]"></p>
                </div>
                <div className="rounded-xl bg-white border overflow-hidden">
                    {invoices.map((invoice) => {
                        return <div key={invoice.id} className=' border-b grid grid-cols-6 gap-10 p-3 cursor-pointer text-black h-max'>
                            <div className="flex items-center gap-1">
                                <img className='w-[30px] h-[30px] rounded-full border' src={invoice.customer.imageUrl} alt={invoice.customer.name} />
                                <p className="text-[13px]  text-wrap text-slate-800 ">{invoice.customer.name}</p>
                            </div>
                            <p className="text-[13px] text-wrap text-slate-800 ">{invoice.customer.email}	</p>
                            <p className="text-[14px] text-slate-800 text-center">${Number(invoice.amount)}</p>
                            <p className="text-[14px] text-slate-800 text-center">{invoice.createdAt.toDateString()}</p>

                            <AppStatus status={invoice.status} />

                            <p className="text-[14px] text-slate-800 flex items-center justify-center gap-2">
                                <button className="px-2 py-2 border rounded-lg text-center">
                                    <Link href={`/invoices/${invoice.id}/edit`}>
                                        <BiEdit size={20} />
                                    </Link>
                                </button>
                                <InvoiceDeleteAction invoiceId={invoice.id} />
                            </p>
                        </div>
                    })}
                </div>
            </div>
            <AppPagination currentPage={Number(page) || 1} totalPage={Math.ceil(invoiceCount / 5)} />
        </div>
    )
}

export default InvoicesPage
export const dynamic = 'force-dynamic';
