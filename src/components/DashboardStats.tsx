
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRestaurant } from "@/contexts/RestaurantContext";
import { Table, Utensils, Receipt, BadgeIndianRupee } from "lucide-react";

export function DashboardStats() {
  const { tables, billHistory } = useRestaurant();
  
  const activeTableCount = tables.length;
  const activeOrdersCount = tables.filter(table => table.items.length > 0).length;
  const totalOrdersCount = billHistory.length;
  
  // Calculate total revenue from bill history
  const totalRevenue = billHistory.reduce((sum, bill) => {
    return sum + bill.grandTotal;
  }, 0);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Active Tables"
        value={activeTableCount.toString()}
        icon={<Table className="h-4 w-4" />}
        description="Currently active tables"
      />
      <StatsCard
        title="Active Orders"
        value={activeOrdersCount.toString()}
        icon={<Utensils className="h-4 w-4" />}
        description="Orders in progress"
      />
      <StatsCard
        title="Total Orders"
        value={totalOrdersCount.toString()}
        icon={<Receipt className="h-4 w-4" />}
        description="Completed orders"
      />
      <StatsCard
        title="Revenue"
        value={`₹${totalRevenue.toFixed(2)}`}
        icon={<BadgeIndianRupee className="h-4 w-4" />}
        description="Total revenue"
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
