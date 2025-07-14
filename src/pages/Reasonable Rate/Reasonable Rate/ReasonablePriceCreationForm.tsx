import { getAllFactor } from "@/api/factor.api";
import { getAllItem } from "@/api/item.api";
import { getItemMarketPrice } from "@/api/market-price.api";
import {
  createReasonablePrice,
  getReasonablePrice,
  updateReasonablePrice,
} from "@/api/reasonable-rate.api";
import { getAllUnit } from "@/api/unit.api";
import FormInput from "@/components/Custom/FormInput";
import FormSearchSelect from "@/components/Custom/FormSearchSelect";
import MultiSelectDropdown from "@/components/Custom/MultiSelectDropdown";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import useFetchData from "@/hooks/useFetchData";
import { reasonablePriceSchema } from "@/schema/reasonable-price.schema";
import { useGlobalStore } from "@/store/store";
import type { FACTOR } from "@/types/factor.type";
import type { ITEM } from "@/types/item.type";
import type { MARKET_PRICE } from "@/types/market-price.type";
import type { REASONABLE_PRICE } from "@/types/reasonable-price.type";
import type { UNIT } from "@/types/unit.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ReasonablePriceCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(reasonablePriceSchema),
    defaultValues: {
      itemId: "",
      unitId: "",
      averagePriceOfMarkets: "",
      priceDetails: {
        currentMarketFixedPrice: "",
        previous3MonthAveragePrice: "",
        priceSetByDistrictMarketOfficerMin: "",
        priceSetByDistrictMarketOfficerMax: "",
      },
      armedForcesPrice: {
        navy: "",
        airForce: "",
        bgb: "",
        others: "",
      },
      selectedFactorIds: [],
    },
  });

  const { data, isLoading } = useFetchData(
    ["reasonable-price", selectedId],
    () => getReasonablePrice(selectedId),
    {
      queryKey: ["reasonable-price", selectedId],
      enabled: selectedId !== null,
    }
  );
  const reasonablePrice: REASONABLE_PRICE | null = data?.data ?? null;

  const { data: allUnits } = useFetchData(["unit"], () => getAllUnit());
  const units: UNIT[] = allUnits?.data ?? [];

  const { data: allItems } = useFetchData(["item"], () => getAllItem());
  const items: ITEM[] = allItems?.data ?? [];

  const { data: allFactors } = useFetchData(["factor"], () => getAllFactor());
  const factors: FACTOR[] = allFactors?.data ?? [];

  const itemId = form.watch("itemId");

  const { data: marketPricesData } = useFetchData(
    ["marketPriceByItemId", itemId],
    () => getItemMarketPrice(Number(itemId)),
    {
      queryKey: ["marketPriceByItemId", itemId],
      enabled: !!itemId && Number(itemId) > 0,
    }
  );
  const marketPrices: MARKET_PRICE[] = marketPricesData?.data ?? [];

  useEffect(() => {
    if (marketPrices.length > 0) {
      const total = marketPrices.reduce(
        (sum, mp) => sum + parseFloat(mp.marketPrice),
        0
      );
      const averagePrice = total / marketPrices.length;
      form.setValue("averagePriceOfMarkets", averagePrice.toFixed(2));
    }
  }, [marketPrices]);

  //   useEffect(() => {
  //     if (operation === "update") {
  //       form.reset({
  //         itemId: reasonablePrice?.itemId.toString() || "",
  //         unitId: reasonablePrice?.unitId.toString() || "",
  //         averagePriceOfMarkets:
  //           reasonablePrice?.averagePriceOfMarkets.toString() || "",
  //         priceDetails: {
  //           currentMarketFixedPrice:
  //             reasonablePrice?.priceDetails.currentMarketFixedPrice || "",
  //           previous3MonthAveragePrice:
  //             reasonablePrice?.priceDetails.previous3MonthAveragePrice || "",
  //           priceSetByDistrictMarketOfficerMin:
  //             reasonablePrice?.priceDetails.priceSetByDistrictMarketOfficerMin ||
  //             "",
  //           priceSetByDistrictMarketOfficerMax:
  //             reasonablePrice?.priceDetails.priceSetByDistrictMarketOfficerMax ||
  //             "",
  //         },
  //         armedForcesPrice: {
  //           navy: reasonablePrice?.armedForcesPrice.navy || "",
  //           airForce: reasonablePrice?.armedForcesPrice.airForce || "",
  //           bgb: reasonablePrice?.armedForcesPrice.bgb || "",
  //           others: reasonablePrice?.armedForcesPrice.others || "",
  //         },
  //       });
  //     }
  //   }, [operation, selectedId, reasonablePrice, form]);

  const createMutation = useMutation({
    mutationFn: createReasonablePrice,
    onSuccess: () => {
      toast.success("Reasonable Rate Create Successful");
      query.invalidateQueries({ queryKey: ["reasonable-price"] });
      closeDrawer();
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string; errors: any } };
      };
      const errorObject: any = err.response?.data?.errors;
      for (const property in errorObject) {
        const errorMessage = Object.values(errorObject[property]).join("");
        form.setError(property as any, { message: errorMessage });
      }
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateReasonablePrice,
    onSuccess: () => {
      toast.success("Reasonable Rate Update Successful");
      query.invalidateQueries({ queryKey: ["reasonable-price"] });
      closeDrawer();
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string; errors: any } };
      };
      const errorObject: any = err.response?.data?.errors;
      for (const property in errorObject) {
        const errorMessage = Object.values(errorObject[property]).join("");
        form.setError(property as any, { message: errorMessage });
      }
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const onSubmit = (data: any) => {
    if (operation === "update") {
      updateMutation.mutate({ id: selectedId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (operation === "update") {
    if (isLoading)
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
          Loading...
        </div>
      );
  }

  return (
    <React.Fragment>
      <DrawerHeader className="gap-1">
        <DrawerTitle>
          {operation === "update"
            ? "Update Reasonable Rate"
            : "Create Reasonable Rate"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} Reasonable Rate.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
        {/*  body start */}

        <Form {...form}>
          <FormSearchSelect
            form={form}
            label="Select Item"
            name="itemId"
            placeholder="Select an item"
            options={items}
          />
          <FormSearchSelect
            form={form}
            label="Select Unit"
            name="unitId"
            placeholder="Select a unit"
            options={units}
          />
          {operation === "create" && (
            <MultiSelectDropdown
              label="Factors"
              options={factors}
              placeholder="Select Factors"
              error={form?.formState.errors.selectedFactorIds?.message}
              onValuesChange={(array: any) =>
                form?.setValue("selectedFactorIds", array)
              }
            />
          )}
          <FormInput
            form={form}
            label="Current Market Fixed Price"
            name="priceDetails.currentMarketFixedPrice"
          />
          <FormInput
            form={form}
            label="Previous 3 Month Average Price"
            name="priceDetails.previous3MonthAveragePrice"
          />
          <FormInput
            form={form}
            label="Price Set by District Market Officer (Min)"
            name="priceDetails.priceSetByDistrictMarketOfficerMin"
          />
          <FormInput
            form={form}
            label="Price Set by District Market Officer (Max)"
            name="priceDetails.priceSetByDistrictMarketOfficerMax"
          />

          <FormInput form={form} label="Navy" name="armedForcesPrice.navy" />
          <FormInput
            form={form}
            label="Air Force"
            name="armedForcesPrice.airForce"
          />
          <FormInput form={form} label="BGB" name="armedForcesPrice.bgb" />
          <FormInput
            form={form}
            label="Others"
            name="armedForcesPrice.others"
          />
        </Form>

        {/* body end */}
      </div>
      <DrawerFooter>
        <Button
          isLoading={createMutation.isPending || updateMutation.isPending}
          onClick={form.handleSubmit(onSubmit)}
        >
          {operation === "update" ? "Update" : "Create"}
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </React.Fragment>
  );
};

export default ReasonablePriceCreationForm;
