
import { useRestaurant } from "@/contexts/RestaurantContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Send, Printer, Clock } from "lucide-react";
import { useState } from "react";

export function OrderHistory() {
  const { billHistory, sendBillToWhatsApp } = useRestaurant();
  const [expandedBill, setExpandedBill] = useState<string | null>(null);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrintBill = (billId: string) => {
    const bill = billHistory.find(b => b.id === billId);
    if (!bill) return;
    
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      // Generate a printable bill (same as in OrderSummary component)
      let printContent = `
        <html>
        <head>
          <title>Bill - Table ${bill.tableId}</title>
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
            <p>Bill ID: ${bill.id}</p>
            <p>Table: ${bill.tableId}</p>
            <p>Date: ${bill.timestamp.toLocaleString()}</p>
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
      
      bill.items.forEach(item => {
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
            <p>Subtotal: ₹${bill.total.toFixed(2)}</p>
            <p>Tax (5%): ₹${bill.tax.toFixed(2)}</p>
            <p><strong>Total: ₹${bill.grandTotal.toFixed(2)}</strong></p>
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

  const handleSendToWhatsApp = (billId: string) => {
    const bill = billHistory.find(b => b.id === billId);
    if (!bill) return;
    
    // Prompt for phone number
    const phoneNumber = prompt("Enter customer's phone number with country code:", "");
    if (!phoneNumber) return;
    
    sendBillToWhatsApp(bill, phoneNumber);
  };

  return (
    <Card className="col-span-full h-96">
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg font-medium">Order History</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {billHistory.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-muted-foreground">No order history yet</p>
            <p className="text-sm text-muted-foreground">
              All completed bills will appear here
            </p>
          </div>
        ) : (
          <ScrollArea className="h-72 px-6">
            <div className="space-y-4">
              {billHistory.map((bill) => (
                <div
                  key={bill.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">Table {bill.tableId}</h3>
                        <div className="flex items-center text-muted-foreground ml-3 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatTime(bill.timestamp)}</span>
                          <span className="mx-1">•</span>
                          <span>{new Date(bill.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="font-medium mt-1">₹{bill.grandTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => handlePrintBill(bill.id)}
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span className="sr-only">Print</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => handleSendToWhatsApp(bill.id)}
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span className="sr-only">Send to WhatsApp</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8"
                        onClick={() => setExpandedBill(expandedBill === bill.id ? null : bill.id)}
                      >
                        {expandedBill === bill.id ? "Hide Details" : "View Details"}
                      </Button>
                    </div>
                  </div>
                  
                  {expandedBill === bill.id && (
                    <div className="mt-4 text-sm border-t pt-4">
                      <div className="space-y-2">
                        {bill.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span>
                              {item.quantity}x {item.menuItem.name}
                            </span>
                            <span>₹{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-4">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{bill.total.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax (5%)</span>
                            <span>₹{bill.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-medium mt-1">
                            <span>Total</span>
                            <span>₹{bill.grandTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
