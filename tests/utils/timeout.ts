/**
 * Get progressive timeout based on test retry attempt
 * - First attempt: base timeout
 * - Retry 1: base × 2
 * - Retry 2: base × 3
 */
export function getProgressiveTimeout(baseTimeout: number, testInfo?: { retry: number }): number {
  if (!testInfo) return baseTimeout;
  
  const multiplier = testInfo.retry + 1; // retry 0 = ×1, retry 1 = ×2, retry 2 = ×3
  return baseTimeout * multiplier;
}

/**
 * Default timeouts for different operations
 */
export const TIMEOUTS = {
  VISIBILITY: 10000,    // 10s base for element visibility
  NAVIGATION: 30000,    // 30s base for page navigation
  NETWORK_IDLE: 15000,  // 15s base for network idle
} as const;
