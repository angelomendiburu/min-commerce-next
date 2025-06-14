import { prisma } from "@/lib/prisma";
import { Order, OrderItem } from "@prisma/client";

type OrderWithItems = Order & {
  items: OrderItem[];
};

export default async function OrdersPage() {
  let orders: OrderWithItems[] = [];
  let error: string | null = null;

  try {
    orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        items: true
      }
    });
  } catch (e) {
    console.error('Error fetching orders:', e);
    error = 'No se pudieron cargar las órdenes. Por favor, intenta más tarde.';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis Órdenes</h1>
      
      {error ? (
        <div className="text-center py-12">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No tienes órdenes aún</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium">Orden #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Total: ${order.total.toFixed(2)}</p>
                  <p className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary inline-block">
                    {order.status}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="text-sm text-muted-foreground">
                    {item.quantity}x {item.productId}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}