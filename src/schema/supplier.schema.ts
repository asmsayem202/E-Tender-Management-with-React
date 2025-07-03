import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(3),
  contactPerson: z.string().min(3),
  mobileNo: z.string().min(3),
  email: z.string().min(3),
  ascLicenseNo: z.string().min(3),
  ascLicenseEndorsementDate: z.string().nullable(),
  ascLicenseExpiryDate: z.string().nullable(),
  bankAccountName: z.string().min(3),
  bankAccountNo: z.string().min(3),
  bankBranchName: z.string().min(3),
  tin: z.string().min(3),
  bin: z.string().min(3),
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
