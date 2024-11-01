import type { CsvClaimType, JsonClaimType } from "lib/types/claims";
import { FromCsvClaimToJsonClaim } from "./DataMapper";

export class DataMapperFromCsvClaimToJsonClaim extends FromCsvClaimToJsonClaim {
  public static convert(data: CsvClaimType): JsonClaimType {
    return {
      reporting_entity_name: "Example Entity",
      reporting_entity_type: "Insurer",
      plan_name: data.Plan,
      plan_id_type: "HIOS",
      plan_id: data["Plan ID"],
      plan_market_type: "Commercial",
      last_updated_on: new Date().toISOString().split("T")[0],
      version: "1.0",
      out_of_network: [
        {
          name: data["Provider Name"],
          billing_code_type: "CPT",
          billing_code_type_version: "2023",
          billing_code: data["Procedure Code"],
          description: "Example description",
          allowed_amounts: [
            {
              tin: {
                type: "TIN",
                value: data["Provider ID"],
              },
              service_code: [data["Procedure Code"]],
              billing_class: data["Claim Type"],
              payments: [
                {
                  allowed_amount: data.Allowed,
                  billing_code_modifier: [],
                  providers: [
                    {
                      billed_charge: data.Billed,
                      npi: [parseInt(data["Provider ID"])],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
