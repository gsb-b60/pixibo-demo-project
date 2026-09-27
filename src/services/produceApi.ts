import type { ApiResponse } from "@/types/womens-fashion";

const API_URL = "/api/api/v1/public-packs/womens-fashion";

let cache: { data: ApiResponse; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getFashionProducts(): Promise<ApiResponse> {
  const now = Date.now();

  if (cache && now - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch fashion products: ${response.status}`);
  }

  const data: ApiResponse = await response.json();
  cache = { data, timestamp: now };
  return data;
}