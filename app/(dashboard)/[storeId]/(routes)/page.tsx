import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { formatter } from "@/lib/utils";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Banknote, CreditCard, Package } from "lucide-react";
import { getProductCount } from "@/actions/get-product-count";
import Overview from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

interface DashboardPageProps {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {

    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getProductCount(params.storeId);
const graphRevenue= await getGraphRevenue(params.storeId)


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Rainbow Fingers" description="An overview of your store" />
                <Separator />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <Banknote className="w-5 h-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="md:text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="w-5 h-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="md:text-2xl font-bold">
                                +{salesCount}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                            <CardTitle className="text-sm font-medium">
                                Products in stock
                            </CardTitle>
                            <Package className="w-5 h-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="md:text-2xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>
                            Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphRevenue} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default DashboardPage;