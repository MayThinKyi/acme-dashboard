'use client';
import React from 'react'
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Bar,
} from 'recharts';

interface Props {
    pending: number;
    paid: number;
}
const RecentRevenue = ({ pending, paid }: Props) => {
    const data: { label: string; value: number }[] = [
        { label: 'Total Pending', value: pending },
        { label: 'Total Paid', value: paid },
    ]
    return (
        <div>
            <h1 className="text-slate-900 text-xl font-bold mb-4">Recent Revenue</h1>
            <div className="bg-[#F9FAFB] p-4 rounded-xl">
                <div className="bg-white p-3">
                    <ResponsiveContainer height={300}>
                        <BarChart data={data}>
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Bar
                                dataKey="value"
                                barSize={60}
                                style={{ fill: '#2F6FEB' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default RecentRevenue
