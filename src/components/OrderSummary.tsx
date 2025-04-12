
import { useRestaurant, OrderItem, TableOrder, BillHistory } from "@/contexts/RestaurantContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Minus, Plus, RefreshCw, Trash2, Send, Printer } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function OrderSummary() {
  const {
    tables,
    activeTableId,
    updateItemQuantity,
    removeItemFromTable,
    generateBill,
    resetTable,
    calculateTableTotal,
    sendBillToWhatsApp
  } = useRestaurant();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentBill, setCurrentBill] = useState<BillHistory | null>(null);

  const activeTable = activeTableId !== null
    ? tables.find((table) => table.id === activeTableId)
    : null;

  const { subtotal, tax, total } = activeTableId !== null
    ? calculateTableTotal(activeTableId)
    : { subtotal: 0, tax: 0, total: 0 };

  const handleGenerateBill = () => {
    if (!activeTableId) return;
    
    const bill = generateBill(activeTableId);
    setCurrentBill(bill);
    toast.success("Bill generated successfully");
  };

  const handleSendToWhatsApp = () => {
    if (!currentBill) {
      toast.error("Generate a bill first");
      return;
    }
    
    sendBillToWhatsApp(currentBill, phoneNumber);
  };

  const handlePrintBill = () => {
    if (!currentBill) {
      toast.error("Generate a bill first");
      return;
    }
    
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      // Generate a printable bill
      let printContent = `
        <html>
        <head>
          <title>Bill - Table ${currentBill.tableId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            h1 { text-align: center; }
            .bill-header { text-align: center; margin-bottom: 20px; }
            .bill-items { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .bill-items th, .bill-items td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            .bill-total { text-align: right; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="bill-header">
            <h1>HotelBill</h1>
            <p>Bill ID: ${currentBill.id}</p>
            <p>Table: ${currentBill.tableId}</p>
            <p>Date: ${currentBill.timestamp.toLocaleString()}</p>
          </div>
          
          <table class="bill-items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      currentBill.items.forEach(item => {
        printContent += `
          <tr>
            <td>${item.menuItem.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.menuItem.price.toFixed(2)}</td>
            <td>₹${(item.menuItem.price * item.quantity).toFixed(2)}</td>
          </tr>
        `;
      });
      
      printContent += `
            </tbody>
          </table>
          
          <div class="bill-total">
            <p>Subtotal: ₹${currentBill.total.toFixed(2)}</p>
            <p>Tax (5%): ₹${currentBill.tax.toFixed(2)}</p>
            <p><strong>Total: ₹${currentBill.grandTotal.toFixed(2)}</strong></p>
          </div>
          
          <div class="footer">
            <p>Thank you for dining with us!</p>
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for content to load then print
      printWindow.onload = function() {
        printWindow.print();
      };
    }
  };

  const handleResetTable = () => {
    if (!activeTableId) return;
    resetTable(activeTableId);
    setCurrentBill(null);
    setPhoneNumber("");
  };

  if (!activeTable) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">No table selected</p>
            <p className="text-sm text-muted-foreground">
              Select or create a table to start an order
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg font-medium">
          Table {activeTable.id} - Order Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden px-0 flex flex-col">
        {activeTable.items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">No items in order</p>
              <p className="text-sm text-muted-foreground">
                Add items from the menu to start the order
              </p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="px-6 py-2 space-y-4">
                {activeTable.items.map((item) => (
                  <OrderItemCard
                    key={item.menuItem.id}
                    item={item}
                    onUpdateQuantity={(quantity) =>
                      updateItemQuantity(activeTable.id, item.menuItem.id, quantity)
                    }
                    onRemove={() => removeItemFromTable(activeTable.id, item.menuItem.id)}
                  />
                ))}
              </div>
            </ScrollArea>
            
            <div className="px-6 py-3 border-t">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex-col gap-4 border-t p-6">
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            variant="outline"
            onClick={handleResetTable}
            className="w-full"
            disabled={activeTable.items.length === 0}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleGenerateBill}
            className="w-full"
            disabled={activeTable.items.length === 0}
          >
            Generate Bill
          </Button>
        </div>
        
        {currentBill && (
          <div className="w-full space-y-4 mt-2 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="phone">Customer's Phone Number</Label>
              <Input
                id="phone"
                placeholder="e.g., +919876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter phone number with country code
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleSendToWhatsApp} variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Send to WhatsApp
              </Button>
              <Button onClick={handlePrintBill} variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print Bill
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function OrderItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: OrderItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border rounded-lg p-3">
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <p className="font-medium truncate">{item.menuItem.name}</p>
          <p className="font-medium ml-2">
            ₹{(item.menuItem.price * item.quantity).toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            ₹{item.menuItem.price.toFixed(2)} each
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
