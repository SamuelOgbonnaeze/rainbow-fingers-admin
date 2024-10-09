import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                    course: true,
                }
            }
        }
    });

   
    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            // Use optional chaining to safely access properties
            const productPrice = item.product?.price?.toNumber() || 0; // Default to 0 if product or price is null
            const coursePrice = item.course?.price || 0; // Default to 0 if course or price is null
            return orderSum + productPrice + coursePrice;
        }, 0);

        return total + orderTotal;
    }, 0);

    return totalRevenue;
};
