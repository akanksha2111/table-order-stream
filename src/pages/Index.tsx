
import { AppLayout } from "@/components/AppLayout";
import { MenuDisplay } from "@/components/MenuDisplay";
import { OrderSummary } from "@/components/OrderSummary";
import { TableManager } from "@/components/TableManager";
import { OrderHistory } from "@/components/OrderHistory";
import { DashboardStats } from "@/components/DashboardStats";
import { RestaurantProvider } from "@/contexts/RestaurantContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <ThemeProvider>
      <RestaurantProvider>
        <AppLayout>
          <div className="grid gap-4 md:gap-6">
            <DashboardStats />
            
            <TableManager />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-[calc(100vh-26rem)]">
              <MenuDisplay />
              <OrderSummary />
            </div>
            
            <OrderHistory />
          </div>
        </AppLayout>
      </RestaurantProvider>
    </ThemeProvider>
  );
};

export default Index;
