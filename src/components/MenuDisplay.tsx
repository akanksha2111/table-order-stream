import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { menuCategories, menuItems, MenuItem } from "@/data/menuData";
import { useRestaurant } from "@/contexts/RestaurantContext";
import { PlusCircle, Search } from "lucide-react";

export function MenuDisplay() {
  const { activeTableId, addItemToTable } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToOrder = (menuItem: MenuItem) => {
    if (activeTableId === null) {
      return;
    }
    addItemToTable(activeTableId, menuItem);
  };

  return (
    <Card className="col-span-1 h-full overflow-hidden flex flex-col">
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-xl font-bold">Menu</CardTitle>
        <CardDescription>Select items to add to the order</CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search menu..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <Tabs defaultValue={menuCategories[0].id} className="flex-1 overflow-hidden">
        <div className="px-6">
          <TabsList className="w-full h-auto justify-start overflow-auto">
            {menuCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-sm whitespace-nowrap"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <ScrollArea className="flex-1">
          <CardContent className="p-6">
            {searchQuery ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Search Results</h3>
                <div className="grid grid-cols-1 gap-4">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} onAddItem={handleAddToOrder} />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No items found</p>
                  )}
                </div>
              </div>
            ) : (
              menuCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {menuItems
                      .filter((item) => item.category === category.id)
                      .map((item) => (
                        <MenuItemCard key={item.id} item={item} onAddItem={handleAddToOrder} />
                      ))}
                  </div>
                </TabsContent>
              ))
            )}
          </CardContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
}

function MenuItemCard({ item, onAddItem }: { item: MenuItem; onAddItem: (item: MenuItem) => void }) {
  const { activeTableId } = useRestaurant();
  const isDisabled = activeTableId === null;

  return (
    <div className="flex items-center justify-between gap-4 border rounded-lg p-4 hover:bg-accent/50 transition-colors">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        <p className="text-sm font-medium mt-1">₹{item.price.toFixed(2)}</p>
      </div>
      <Button
        onClick={() => onAddItem(item)}
        disabled={isDisabled}
        size="sm"
        variant="outline"
        className="flex-shrink-0"
      >
        <PlusCircle className="h-4 w-4 mr-1" />
        <span>Add</span>
      </Button>
    </div>
  );
}
