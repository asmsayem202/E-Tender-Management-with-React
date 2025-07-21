import { getItemMarketPrice } from "@/api/market-price.api";
import { getReasonablePrice } from "@/api/reasonable-rate.api";
import useFetchData from "@/hooks/useFetchData";
import { useGlobalStore } from "@/store/store";
import type { MARKET_PRICE } from "@/types/market-price.type";
import type { REASONABLE_PRICE } from "@/types/reasonable-price.type";
import { Loader2 } from "lucide-react";

interface Props {
  contentRef: React.Ref<HTMLDivElement>;
}

const PrintResonablePricePage = ({ contentRef }: Props) => {
  const selectedId = useGlobalStore((state) => state.selectedId);

  const { data, isLoading } = useFetchData(
    ["reasonable-price", selectedId],
    () => getReasonablePrice(selectedId),
    {
      queryKey: ["reasonable-price", selectedId],
      enabled: selectedId !== null,
    }
  );
  const reasonablePrice: REASONABLE_PRICE | null = data?.data ?? null;

  const { data: marketPriceData } = useFetchData(
    ["market-price", selectedId],
    () =>
      reasonablePrice?.itemId
        ? getItemMarketPrice(Number(reasonablePrice.itemId))
        : Promise.resolve(null),
    {
      queryKey: ["market-price", reasonablePrice?.itemId],
      enabled:
        !!reasonablePrice?.itemId && !isNaN(Number(reasonablePrice.itemId)),
    }
  );
  const marketPrices: MARKET_PRICE[] = marketPriceData?.data;

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader2 className="animate-spin" />
        Loading...
      </div>
    );
  return (
    <div ref={contentRef} className="p-4">
      <div className="overflow-x-auto rounded-lg ">
        <div className="p-5">
          <h3 className="text-center">সীমিত</h3>
          <div className="flex justify-end mt-5">
            <div>
              <p className="underline">পরিশিষ্ট-১</p>
              <p className="underline">ক্রোড়পত্র ক</p>
              <p className="underline">বিএসডি চট্টগ্রাম পত্র নং</p>
              <p className="underline">২৩.০১.৯২৪.৩৮৭.৪০০.০১.২৩.০৯.২৪</p>
              <p className="underline">তারিখঃ সেপ্টেম্বর ২০২৪</p>
            </div>
          </div>
          <h3 className="text-center my-5 underline">
            গ্রহণযোগ্য/যুক্তিযুক্ত দর (REASONABLE RATES) নির্ধারণী ছক
          </h3>
          <div className="flex justify-between my-5">
            <div>
              <p>আইটেমঃ গো-মাংস (তাজা)</p>
              <p>এরিয়াঃ এরিয়া সদর দপ্তর চট্টগ্রাম</p>
            </div>
            <div>
              <p>ডিপোঃ বিএসডি চট্টগ্রাম</p>
              <p>চুক্তি মৌসুমঃ জানুয়ারি-জুন ২০২৫</p>
            </div>
          </div>
        </div>
        <table className="w-full border-collapse border  text-sm text-left">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="border border-gray-600 px-4 py-2 w-[50px]">#</th>
              <th
                colSpan={3}
                className="border border-gray-600 px-4 py-2 w-[50px]"
              >
                Details
              </th>
              <th className="border border-gray-600 px-4 py-2 w-[50px]">
                Remarks
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="border border-gray-600 px-4 py-2">1</td>
              <td colSpan={3} className="border border-gray-600 px-4 py-2">
                দ্রব্যের নাম
              </td>
              <td className="border border-gray-600 px-4 py-2">
                {reasonablePrice?.itemName}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-600 px-4 py-2">2</td>
              <td colSpan={3} className="border border-gray-600 px-4 py-2">
                হিসাবের একক
              </td>
              <td className="border border-gray-600 px-4 py-2">
                {reasonablePrice?.unitName}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-600 px-4 py-2">3</td>
              <td colSpan={3} className="border border-gray-600 px-4 py-2">
                চলতি মৌসুমের ঠিকাচুক্তি দর (জুলাই-ডিসেম্বর ২০২৪)
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <span className="mr-1">BDT</span>
                {reasonablePrice?.priceDetails?.currentMarketFixedPrice}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">4</td>
              <td colSpan={3} className="border border-gray-600 px-4 py-2">
                পূর্ববর্তী ০৩টি ঠিকা মৌসুমের গড় দর
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <span className="mr-1">BDT</span>
                {reasonablePrice?.priceDetails?.previous3MonthAveragePrice}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">5</td>
              <td colSpan={3} className="border border-gray-600 px-4 py-2">
                জেলা মার্কেটিং অফিসার কর্তৃক উদ্ধৃত দর
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <div className="flex items-center gap-2">
                  <div>
                    <span className="mr-1">BDT</span>
                    {
                      reasonablePrice?.priceDetails
                        ?.priceSetByDistrictMarketOfficerMin
                    }
                  </div>
                  <span>-</span>
                  <div>
                    <span className="mr-1">BDT</span>
                    {
                      reasonablePrice?.priceDetails
                        ?.priceSetByDistrictMarketOfficerMax
                    }
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                rowSpan={marketPrices?.length}
                className="border border-gray-600 px-4 py-2"
              >
                6
              </td>
              <td
                rowSpan={marketPrices?.length}
                className="border border-gray-600 px-4 py-2"
              >
                Local Market Prices
              </td>
              <td className="border border-gray-600 px-4 py-2">
                {marketPrices?.[0]?.marketName}
              </td>
              <td className="border border-gray-600 px-4 py-2">
                {" "}
                <span className="mr-1">BDT</span>
                {marketPrices?.[0]?.marketPrice}
              </td>
              <td
                rowSpan={marketPrices?.length}
                className="border border-gray-600 px-4 py-2"
              >
                <span className="mr-1">BDT</span>
                {reasonablePrice?.averagePriceOfMarkets}
              </td>
            </tr>
            {marketPrices?.slice(1)?.map((marketPrice) => (
              <tr key={marketPrice?.id}>
                <td className="border border-gray-600 px-4 py-2">
                  {marketPrice?.marketName}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <span className="mr-1">BDT</span>
                  {marketPrice?.marketPrice}
                </td>
              </tr>
            ))}

            <tr>
              <td rowSpan={4} className="border border-gray-600 px-4 py-2">
                7
              </td>
              <td rowSpan={4} className="border border-gray-600 px-4 py-2">
                দায়িত্বপূর্ণ এলাকার মধ্যে অন্যান্য সরকারী অফিস/সংস্থা সমূহের
                ইউনিট/স্থাপনা থেকে থাকলে তাদের চুক্তির মূল্য
              </td>
              <td colSpan={2} className="border border-gray-600 px-4 py-2">
                নৌ বাহিনী
              </td>

              <td className="border border-gray-600 px-4 py-2">
                <span className="mr-1">BDT</span>
                {reasonablePrice?.armedForcesPrice?.navy}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border border-gray-600 px-4 py-2">
                বিমান বাহিনী
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <span className="mr-1">BDT</span>
                {reasonablePrice?.armedForcesPrice?.airForce}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border border-gray-600 px-4 py-2">
                বিজিবি
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <span className="mr-1">BDT</span>
                {reasonablePrice?.armedForcesPrice?.bgb}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border border-gray-600 px-4 py-2">
                অন্যান্য
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <span className="mr-1">BDT</span>
                {reasonablePrice?.armedForcesPrice?.others}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintResonablePricePage;
