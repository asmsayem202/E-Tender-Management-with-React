import { z } from "zod";

export const reasonablePriceSchema = z.object({
  itemId: z.string().min(1, "Item is required"),
  unitId: z.string().min(1, "Unit is required"),
  averagePriceOfMarkets: z.string(),

  priceDetails: z.object({
    currentMarketFixedPrice: z.string(),
    previous3MonthAveragePrice: z.string(),
    priceSetByDistrictMarketOfficerMin: z.string(),
    priceSetByDistrictMarketOfficerMax: z.string(),
  }),

  armedForcesPrice: z.object({
    navy: z.string(),
    airForce: z.string(),
    bgb: z.string(),
    others: z.string(),
  }),

  selectedFactorIds: z.array(z.number()),
});
