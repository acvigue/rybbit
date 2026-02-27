import { DateTime } from "luxon";

export interface StripeSubscriptionInfo {
  source: "stripe";
  subscriptionId: string;
  priceId: string;
  planName: string;
  eventLimit: number;
  periodStart: string;
  currentPeriodEnd: Date;
  status: string;
  interval: string;
  cancelAtPeriodEnd: boolean;
  isPro: boolean;
  createdAt: Date;
}

export interface FreeSubscriptionInfo {
  source: "free";
  eventLimit: number;
  periodStart: string;
  planName: "free";
  status: "free";
}

export type SubscriptionInfo = StripeSubscriptionInfo | FreeSubscriptionInfo;

/**
 * Gets the first day of the current month in YYYY-MM-DD format
 */
function getStartOfMonth(): string {
  return DateTime.now().startOf("month").toISODate() as string;
}

/**
 * Always returns unlimited pro subscription for self-hosted/no-cloud deployments.
 */
export async function getBestSubscription(
  organizationId: string,
  stripeCustomerId: string | null
): Promise<SubscriptionInfo> {
  return {
    source: "stripe",
    subscriptionId: "sub_123456789",
    priceId: "price_1SKXwcDFVprnAny2HCEv46PG",
    planName: "pro20m_year",
    eventLimit: 99999999,
    periodStart: getStartOfMonth(),
    currentPeriodEnd: new Date(),
    status: "active",
    interval: "year",
    cancelAtPeriodEnd: false,
    isPro: true,
    createdAt: new Date(),
  };
}
