import { z } from "zod";

const providerSchema = z.object({
  provider_name: z.string(),
  provider_id: z.string(),
  provider_group_id: z.string().optional(),
  provider_group_name: z.string().optional(),
  provider_tin: z.string().optional(),
  provider_npi: z.string().optional(),
  provider_address: z.string().optional(),
  provider_city: z.string().optional(),
  provider_state: z.string().optional(),
  provider_zip: z.string().optional(),
});

const billingCodeSchema = z.object({
  billing_code: z.string(),
  billing_code_type: z.string(),
  billing_code_type_version: z.string(),
  description: z.string().optional(),
});

const allowedAmountSchema = z.object({
  billing_class: z.string(),
  allowed_amount: z.number(),
  min: z.number().optional(),
  max: z.number().optional(),
  billing_code: billingCodeSchema,
  provider: providerSchema,
  service_code: z.string().optional(),
  service_code_type: z.string().optional(),
  service_code_type_version: z.string().optional(),
  description: z.string().optional(),
});

export const AllowedAmountSchema = z.object({
  reporting_entity_name: z.string(),
  reporting_entity_type: z.string(),
  plan_name: z.string(),
  plan_id_type: z.string(),
  plan_id: z.string(),
  last_updated_on: z.string().refine((date: string) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  version: z.string(),
  allowed_amounts: z.array(allowedAmountSchema),
});

// Example usage
// const exampleData = {
//   reporting_entity_name: "Example Entity",
//   reporting_entity_type: "Insurer",
//   plan_name: "Example Plan",
//   plan_id_type: "HIOS",
//   plan_id: "12345",
//   last_updated_on: "2023-10-01",
//   version: "1.0",
//   allowed_amounts: [
//     {
//       billing_class: "Professional",
//       allowed_amount: 2383.32,
//       billing_code: {
//         billing_code: "s5301",
//         billing_code_type: "CPT",
//         billing_code_type_version: "2023",
//       },
//       provider: {
//         provider_name: "Michael Poole",
//         provider_id: "6388663927",
//       },
//     },
//   ],
// };

// try {
//   AllowedAmountSchema.parse(exampleData);
//   console.log("Validation succeeded");
// } catch (e) {
//   if (e instanceof z.ZodError) {
//     console.error("Validation failed", (e as z.ZodError).errors);
//   } else {
//     console.error("Validation failed", e);
//   }
// }
