import { z } from "zod";
import { ClaimStatus, ClaimType, DivisionID, DivisionName, GroupID, GroupName, Field, MemberGender, PaymentStatus, PlaceOfService, Plan, PlanID } from "../enums/csv-claims";

export const CsvClaimSchema = z
  .object({
    "Claim ID": z.number(),
    "Subscriber ID": z.string(),
    "Member Sequence": z.number(),
    "Claim Status": z.enum(Object.values(ClaimStatus) as [string, ...string[]]),
    Billed: z.number(),
    Allowed: z.number(),
    Paid: z.number(),
    "Payment Status Date": z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    "Service Date": z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    "Received Date": z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    "Entry Date": z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    "Processed Date": z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    "Paid Date": z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    "Payment Status": z.enum(Object.values(PaymentStatus) as [string, ...string[]]),
    "Group Name": z.enum(Object.values(GroupName) as [string, ...string[]]),
    "Group ID": z.enum(Object.values(GroupID) as [string, ...string[]]),
    "Division Name": z.enum(Object.values(DivisionName) as [string, ...string[]]),
    "Division ID": z.enum(Object.values(DivisionID) as [string, ...string[]]),
    Plan: z.enum(Object.values(Plan) as [string, ...string[]]),
    "Plan ID": z.enum(Object.values(PlanID) as [string, ...string[]]),
    "Place of Service": z.enum(Object.values(PlaceOfService) as [string, ...string[]]),
    "Claim Type": z.enum(Object.values(ClaimType) as [string, ...string[]]),
    "Procedure Code": z.string(),
    "Member Gender": z.enum(Object.values(MemberGender) as [string, ...string[]]),
    "Provider ID": z.number(),
    "Provider Name": z.string(),
  })
  .refine(
    (row) => {
      if (row[Field.GroupName] === GroupName.AcmeCorporation) {
        return row[Field.GroupID] === GroupID.ACM001;
      }
      if (row[Field.GroupName] === GroupName.CityGovernment) {
        return row[Field.GroupID] === GroupID.CGV004;
      }
      if (row[Field.GroupName] === GroupName.EducationAlliance) {
        return row[Field.GroupID] === GroupID.EDA005;
      }
      if (row[Field.GroupName] === GroupName.GlobalEnterprises) {
        return row[Field.GroupID] === GroupID.GLE003;
      }
      if (row[Field.GroupName] === GroupName.TechSolutionsInc) {
        return row[Field.GroupID] === GroupID.TSI002;
      }
      return false;
    },
    { message: "Group Name and Group ID doesn't match" },
  )
  .refine(
    (row) => {
      if (row[Field.DivisionName] === DivisionName.East) {
        return row[Field.DivisionID] === DivisionID.E;
      }
      if (row[Field.DivisionName] === DivisionName.North) {
        return row[Field.DivisionID] === DivisionID.N;
      }
      if (row[Field.DivisionName] === DivisionName.South) {
        return row[Field.DivisionID] === DivisionID.S;
      }
      if (row[Field.DivisionName] === DivisionName.West) {
        return row[Field.DivisionID] === DivisionID.W;
      }
      return false;
    },
    { message: "Division Name and Division ID  doesn't match" },
  )
  .refine(
    (row) => {
      if (row[Field.Plan] === Plan.BasicHealthPlan) {
        return row[Field.PlanID] === PlanID.BHP001;
      }
      if (row[Field.Plan] === Plan.FamilyCoveragePlan) {
        return row[Field.PlanID] === PlanID.FCP003;
      }
      if (row[Field.Plan] === Plan.PremiumCarePlan) {
        return row[Field.PlanID] === PlanID.PCP002;
      }
      if (row[Field.Plan] === Plan.SeniorWellnessPlan) {
        return row[Field.PlanID] === PlanID.SWP004;
      }
      if (row[Field.Plan] === Plan.YoungAdultPlan) {
        return row[Field.PlanID] === PlanID.YAP005;
      }
      return false;
    },
    { message: "Plan and Plan ID doesn't match" },
  );

export type CsvClaimSchemaType = z.infer<typeof CsvClaimSchema>;

export const CsvClaimsSchema = z.array(CsvClaimSchema);

export type CsvClaimsSchemaType = z.infer<typeof CsvClaimsSchema>;
