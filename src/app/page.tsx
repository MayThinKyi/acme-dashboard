import React from 'react'
import DashboardReport from './components/DashboardReport'
import LatestInvoices from './components/LatestInvoices'
import RecentRevenue from './components/RecentRevenue'
import prisma from '../../prisma/db'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard'
}
const HomePage = async () => {
  const pendingCount = await prisma.invoice.count({ where: { status: 'PENDING' } })
  const paidCount = await prisma.invoice.count({ where: { status: 'PAID' } })

  return (
    <div className='py-5'>
      <h1 className="text-xl font-bold mb-8">Dashboard</h1>
      <DashboardReport />
      <div className="grid grid-cols-2 gap-5 mt-8">
        <RecentRevenue pending={pendingCount} paid={paidCount} />
        <LatestInvoices />
      </div>
    </div>
  )
}

export default HomePage
