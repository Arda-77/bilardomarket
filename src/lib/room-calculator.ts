// Adapted from Manus reference implementation. Pure math: maps a room footprint
// to billiard-table sizes that fit with proper queue clearance around them.

export interface RoomDimensions {
  length: number; // cm
  width: number; // cm
}

export interface TableDimensions {
  id: string;
  name: string;
  length: number; // cm
  width: number; // cm
  minClearance: number; // cm — typical queue + comfort buffer
}

export const BILLIARD_TABLES: TableDimensions[] = [
  { id: "6ft", name: "6 Fit Masa", length: 183, width: 91, minClearance: 150 },
  { id: "7ft", name: "7 Fit Masa", length: 213, width: 107, minClearance: 150 },
  { id: "8ft", name: "8 Fit Masa", length: 244, width: 122, minClearance: 150 },
  { id: "9ft", name: "9 Fit Masa", length: 274, width: 137, minClearance: 150 },
  { id: "10ft", name: "10 Fit Masa", length: 305, width: 152, minClearance: 150 },
  { id: "12ft", name: "12 Fit Masa", length: 366, width: 183, minClearance: 150 },
];

export interface TableRecommendation {
  table: TableDimensions;
  fits: boolean;
  clearanceLength: number;
  clearanceWidth: number;
}

export function evaluateRoom(room: RoomDimensions): TableRecommendation[] {
  return BILLIARD_TABLES.map((table) => {
    const clearanceLength = (room.length - table.length) / 2;
    const clearanceWidth = (room.width - table.width) / 2;
    return {
      table,
      fits:
        clearanceLength >= table.minClearance &&
        clearanceWidth >= table.minClearance,
      clearanceLength,
      clearanceWidth,
    };
  });
}

export function getLargestFittingTable(
  room: RoomDimensions,
): TableDimensions | null {
  const fits = evaluateRoom(room)
    .filter((r) => r.fits)
    .sort((a, b) => b.table.length - a.table.length);
  return fits[0]?.table ?? null;
}
