import React from 'react'
import prisma from '../../../prisma/db'

const LatestInvoices = async () => {
    const invoices = await prisma.invoice.findMany({
        orderBy: { createdAt: 'desc' },
        include: { customer: true },
        take: 5
    })
    return (
        <div>
            <h1 className="text-slate-900 text-xl font-bold mb-4">Latest Invoices</h1>
            <div className="bg-[#F9FAFB] p-4 rounded-xl">
                <div className="bg-white p-3">
                    {invoices.map((invoice) => {
                        return <div key={invoice.id} className="cursor-pointer flex justify-between items-center mb-2 border-b pb-3">
                            <div className="flex items-center gap-3">
                                <img className='w-[40px] h-[40px] rounded-full' src={invoice.customer.imageUrl} />
                                <div>
                                    <p className="text-slate-800 font-semibold mb-0 pb-0">{invoice.customer.name}</p>
                                    <small>{invoice.customer.email}</small>
                                </div>
                            </div>
                            <p className="text-slate-800 font-bold text-md">${Number(invoice.amount)}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default LatestInvoices
