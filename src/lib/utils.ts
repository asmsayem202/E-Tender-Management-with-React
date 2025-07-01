import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const readImageFile = ({
  setterFunction,
  file,
}: {
  setterFunction: (result: string) => void;
  file: File;
}) => {
  const reader = new FileReader();

  reader.onload = () => {
    const result = reader.result;

    if (typeof result === "string") {
      setterFunction(result);
    } else {
      console.error("Unexpected result type : ", result);
    }
  };

  reader.readAsDataURL(file);
};

export function formatDateTime(date: Date): string {
  const pad = (n: number): string => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-based
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const permissionObj = [
  {
    module: "SSD & BSD",
    subModule: [
      {
        name: "ssd",
        actions: ["create", "update", "delete", "index"],
      },
      {
        name: "bsd",
        actions: ["create", "update", "delete", "index"],
      },
    ],
  },
  {
    module: "Perishable Product/Item Management",
    subModule: [
      {
        name: "Parent Category",
        actions: ["create", "update", "delete", "index"],
      },
      {
        name: "Category",
        actions: ["create", "update", "delete", "index"],
      },
      {
        name: "Unit",
        actions: ["create", "update", "delete", "index"],
      },
      {
        name: "Item",
        actions: ["create", "update", "delete", "index"],
      },
    ],
  },
  {
    module: "Reasonable Rate Management",
    subModule: [
      {
        name: "Factor",
        actions: ["create", "update", "delete", "index"],
      },
      {
        name: "Reasonable Rate",
        actions: ["calculate"],
      },
    ],
  },
  {
    module: "Requisition Management from BSD/SSD",
    subModule: [],
  },
  {
    module: "Supplier Management",
    subModule: [],
  },
  {
    module: "Tender Management",
    subModule: [
      {
        name: "Format",
        actions: ["create", "update", "delete", "index"],
      },
      {
        name: "Tender",
        actions: ["create", "update", "delete", "index"],
      },
    ],
  },
  {
    module: "Reporting Module",
    subModule: [],
  },
  {
    module: "Role Authorization",
    subModule: [
      {
        name: "Role",
        actions: ["create", "update", "delete", "index"],
      },
      {
        name: "Permission",
        actions: ["create", "update", "delete", "index"],
      },
      {
        name: "User",
        actions: ["create", "update", "delete", "index"],
      },
    ],
  },
];
