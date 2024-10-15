"use client"

import { Card } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ColorClient } from "../../../colors/components/client";

interface ChartProps {
    data: {
        name: string;
        total: number;
    }[]
}

const chartConfig = {
 data:{
    label: "Courses",
    color:"#888888"
 }
  } satisfies ChartConfig

const Chart = ({ data }: ChartProps) => {
    return (
        <Card>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height={450}>
                <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={true}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₦${value}`}
                    />
                     <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                        dataKey="total"
                        fill="#DF3B11"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
            </ChartContainer>
        </Card>
    );
}

export default Chart;