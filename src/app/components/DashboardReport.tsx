import React from 'react'
import ReportItem from './ReportItem'
import { TbCash } from "react-icons/tb";
import { LuClock3 } from "react-icons/lu";
import { TbInvoice } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import prisma from '../../../prisma/db';

const DashboardReport = async () => {
    const invoices = await prisma.invoice.findMany();
    let totalPaid = 0;
    let totalPending = 0;
    invoices.map((invoice) => {
        invoice.status === 'PAID' ? totalPaid += Number(invoice.amount) : totalPending += Number(invoice.amount)
    })
    const customersCount = await prisma.customer.count();
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2'>
            <ReportItem icon={<TbCash />} title='Collected' value={totalPaid} />
            <ReportItem icon={<LuClock3 />} title='Pending' value={totalPending} /> <ReportItem icon={<TbInvoice />} title='Total Invoices' value={invoices.length} /> <ReportItem icon={<FaUsers />} title='Total Customers' value={customersCount} />
        </div>
    )
}

export default DashboardReport
