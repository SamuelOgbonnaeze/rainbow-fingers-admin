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
    accessorKey: "name",
    header: "Name",
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
