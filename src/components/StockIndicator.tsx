import {
  getProductStock,
  getStockColorClass,
  getStockLabel,
} from "@/lib/inventory";

export default function StockIndicator({
  productId,
  size = "sm",
  showQuantity = false,
}: {
  productId: string;
  size?: "sm" | "md";
  showQuantity?: boolean;
}) {
  const stock = getProductStock(productId);
  const dot = size === "md" ? "w-2.5 h-2.5" : "w-2 h-2";
  const text = size === "md" ? "text-sm" : "text-xs";
  return (
    <div className={`flex items-center gap-2 ${text} text-coffee-soft`}>
      <span
        className={`${dot} rounded-full ${getStockColorClass(stock.status)} ${
          stock.status === "in_stock" ? "animate-pulse" : ""
        }`}
        aria-hidden
      />
      <span>{getStockLabel(stock.status)}</span>
      {showQuantity && stock.status !== "out_of_stock" && (
        <span className="text-coffee-soft/70">· {stock.quantity} adet</span>
      )}
    </div>
  );
}
