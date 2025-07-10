import { getAllItem } from "@/api/item.api";
import {
  createMarketPrice,
  getMarketPrice,
  updateMarketPrice,
} from "@/api/market-price.api";
import {
  createMarket,
  getAllMarket,
  getMarket,
  updateMarket,
} from "@/api/market.api";
import FormInput from "@/components/Custom/FormInput";
import FormSearchSelect from "@/components/Custom/FormSearchSelect";
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
import { marketPriceSchema } from "@/schema/market-price.schema";
import { useGlobalStore } from "@/store/store";
import type { ITEM } from "@/types/item.type";
import type { MARKET_PRICE } from "@/types/market-price.type";
import type { MARKET } from "@/types/market.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const MarketPriceCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(marketPriceSchema),
    defaultValues: {
      itemId: "",
      marketId: "",
      marketPrice: "",
    },
  });

  const { data, isLoading } = useFetchData(
    ["market-price", selectedId],
    () => getMarketPrice(selectedId),
    {
      queryKey: ["market-price", selectedId],
      enabled: selectedId !== null,
    }
  );
  const marketPrice: MARKET_PRICE | null = data?.data ?? null;

  const { data: allMarkets } = useFetchData(["market"], () => getAllMarket());
  const markets: MARKET[] = allMarkets?.data ?? [];

  const { data: allItems } = useFetchData(["item"], () => getAllItem());
  const items: ITEM[] = allItems?.data ?? [];

  useEffect(() => {
    if (operation === "update") {
      form.reset({
        itemId: marketPrice?.itemId.toString() || "",
        marketId: marketPrice?.marketId.toString() || "",
        marketPrice: marketPrice?.marketPrice.toString() || "",
      });
    }
  }, [operation, selectedId, marketPrice, form]);

  const createMutation = useMutation({
    mutationFn: createMarketPrice,
    onSuccess: () => {
      toast.success("Market Rate Create Successful");
      query.invalidateQueries({ queryKey: ["market-price"] });
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
    mutationFn: updateMarketPrice,
    onSuccess: () => {
      toast.success("Market Rate Update Successful");
      query.invalidateQueries({ queryKey: ["market-price"] });
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
          {operation === "update" ? "Update Market Rate" : "Create Market Rate"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} Market Rate.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
        {/*  body start */}

        <Form {...form}>
          <FormSearchSelect
            form={form}
            label="Select Market"
            name="marketId"
            placeholder="Select a market"
            options={markets}
          />
          <FormSearchSelect
            form={form}
            label="Select Item"
            name="itemId"
            placeholder="Select an item"
            options={items}
          />
          <FormInput form={form} label="Market Rate" name="marketPrice" />
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

export default MarketPriceCreationForm;
