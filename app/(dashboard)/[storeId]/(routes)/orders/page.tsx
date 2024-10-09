import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async (
    { params }: { params: { storeId: string } }
) => {

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                    course: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        name: item.name,
      
        products: item.orderItems.map((orderItem) => orderItem.product?.name || 'N/A').join(', '),
        courses: item.orderItems.map((orderItem) => orderItem.course?.title || 'N/A').join(', '),
        
        totalPrice: formatter.format(item.orderItems.reduce((total, orderItem) => {
            const productPrice = orderItem.product?.price?.toNumber() || 0;
            const coursePrice = orderItem.course?.price || 0;
            return total + productPrice + coursePrice;
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    console.log(formattedOrders);

    return (
        <div className='flex-col'>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
};

export default OrdersPage;
