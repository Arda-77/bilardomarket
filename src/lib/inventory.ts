// Deterministic mock stock per product ID until a real DB backs this.
// Numeric range maps to a traffic-light state used across cards and detail pages.

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface StockInfo {
  quantity: number;
  status: StockStatus;
}

const SEED_RANGE = 25;

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getProductStock(productId: string): StockInfo {
  // 70% of products are well stocked, 20% low, 10% out — using deterministic hash
  const bucket = hashId(productId) % 10;
  let quantity: number;
  if (bucket === 0) quantity = 0;
  else if (bucket <= 2) quantity = (hashId(productId) % 5) + 1;
  else quantity = (hashId(productId) % (SEED_RANGE - 10)) + 10;
  return { quantity, status: getStockStatus(quantity) };
}

export function getStockStatus(quantity: number): StockStatus {
  if (quantity >= 10) return "in_stock";
  if (quantity > 0) return "low_stock";
  return "out_of_stock";
}

export function getStockLabel(status: StockStatus): string {
  switch (status) {
    case "in_stock":
      return "Stokta var";
    case "low_stock":
      return "Az stok";
    case "out_of_stock":
      return "Tükendi";
  }
}

export function getStockColorClass(status: StockStatus): string {
  switch (status) {
    case "in_stock":
      return "bg-green";
    case "low_stock":
      return "bg-amber-500";
    case "out_of_stock":
      return "bg-red-500";
  }
}
