import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
  contactPerson: z.string().min(1, {
    message: "This is required",
  }),
  mobileNo: z.string().min(1, {
    message: "This is required",
  }),
  email: z.string().min(1, {
    message: "This is required",
  }),
  ascLicenseNo: z.string().min(1, {
    message: "This is required",
  }),
  ascLicenseEndorsementDate: z.string().nullable(),
  ascLicenseExpiryDate: z.string().nullable(),
  bankAccountName: z.string().min(1, {
    message: "This is required",
  }),
  bankAccountNo: z.string().min(1, {
    message: "This is required",
  }),
  bankBranchName: z.string().min(1, {
    message: "This is required",
  }),
  tin: z.string().min(1, {
    message: "This is required",
  }),
  bin: z.string().min(1, {
    message: "This is required",
  }),
  tinPicturePath: z.any().nullable(),
  binPicturePath: z.any().nullable(),
  assetValue: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  contractCapacity: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  otherBusiness: z.boolean().nullable(),
  securityClearanceValidity: z.string().nullable(),
  supplierPhotosPath: z.any().nullable(),
  signaturePicturePath: z.any().nullable(),
  otherBusinessLicensesCopyPath: z.any().nullable(),
});
