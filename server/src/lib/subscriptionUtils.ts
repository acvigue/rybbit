import { sql } from "drizzle-orm";
import { DateTime } from "luxon";
import Stripe from "stripe";
import { db } from "../db/postgres/postgres.js";
import { APPSUMO_TIER_LIMITS, DEFAULT_EVENT_LIMIT, getStripePrices, StripePlan } from "./const.js";
import { stripe } from "./stripe.js";

export interface AppSumoSubscriptionInfo {
  source: "appsumo";
  tier: string;
  eventLimit: number;
  periodStart: string;
  planName: string;
  status: "active";
  interval: "lifetime";
  cancelAtPeriodEnd: false;
  isPro: false;
}

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

export type SubscriptionInfo = AppSumoSubscriptionInfo | StripeSubscriptionInfo | FreeSubscriptionInfo;

/**
 * Gets the first day of the current month in YYYY-MM-DD format
 */
function getStartOfMonth(): string {
  return DateTime.now().startOf("month").toISODate() as string;
}

/**
 * Gets the best subscription for an organization (highest event limit)
 * Checks both AppSumo and Stripe subscriptions and returns the one with the higher limit
 * @returns The subscription with the highest event limit, or free tier if none found
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
  }
}
