
import { useRestaurant } from "@/contexts/RestaurantContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";

export function TableManager() {
  const { tables, activeTableId, createTable, removeTable, setActiveTable } = useRestaurant();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Tables</CardTitle>
        <Button onClick={createTable} size="sm" className="h-8">
          <Plus className="h-4 w-4 mr-1" />
          Create Table
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {tables.map((table) => (
            <div key={table.id} className="relative">
              <Button
                variant="outline"
                onClick={() => setActiveTable(table.id)}
                className={cn(
                  "w-full h-12 justify-center",
                  activeTableId === table.id && "border-primary bg-primary/10"
                )}
              >
                Table {table.id}
                <div 
                  className={cn(
                    "absolute -top-1 -right-1 w-3 h-3 rounded-full",
                    table.items.length > 0 ? "bg-green-500" : "bg-gray-300"
                  )}
                />
              </Button>
              {table.items.length === 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTable(table.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">Remove table</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
