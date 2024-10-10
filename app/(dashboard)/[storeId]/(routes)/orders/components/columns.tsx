"use client"

import { ColumnDef } from "@tanstack/react-table"


export type OrderColumn = {
  id: string
  phone: string
  name: string
  isPaid: boolean
  totalPrice: string
  products: string
  courses:string
  createdAt: string

}

export const columns: ColumnDef<OrderColumn>[] = [
  
  {
    accessorKey: "name",
    header: "Name",
  },{
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "courses",
    header: "Courses",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  }
]
