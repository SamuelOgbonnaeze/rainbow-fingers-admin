"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

interface OverviewProps {
    data: any[]
}

const chartConfig = {
    data:{
       label: "Month",
       color:"#888888"
    }
     } satisfies ChartConfig

const Overview: React.FC<OverviewProps> = ({ data }) => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height={350}>
            <BarChart accessibilityLayer data={data}>
                <XAxis
                    dataKey="name"
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₦${value}`}
                />
                 <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="total" fill="#DF3B11" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
        </ChartContainer>
    );
}

export default Overview;