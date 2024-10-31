import { ClaimStatus, ClaimType, DivisionID, DivisionName, GroupID, GroupName, Field, MemberGender, PaymentStatus, PlaceOfService, Plan, PlanID } from "../enums/csv-claims";

type ClaimStatusType = keyof typeof ClaimStatus;
type ClaimTypeType = keyof typeof ClaimType;
type DivisionIDType = keyof typeof DivisionID;
type DivisionNameType = keyof typeof DivisionName;
type GroupIDType = keyof typeof GroupID;
type GroupNameType = keyof typeof GroupName;
type MemberGenderType = keyof typeof MemberGender;
type PaymentStatusType = keyof typeof PaymentStatus;
type PlaceOfServiceType = keyof typeof PlaceOfService;
type PlanType = keyof typeof Plan;
type PlanIDType = keyof typeof PlanID;

export type CsvClaimType = {
  "Claim ID": number;
  "Subscriber ID": string;
  "Member Sequence": number;
  "Claim Status": ClaimStatusType;
  Billed: number;
  Allowed: number;
  Paid: number;
  "Payment Status Date": string;
  "Service Date": string;
  "Received Date": string;
  "Entry Date": string;
  "Processed Date": string;
  "Paid Date": string;
  "Payment Status": PaymentStatusType;
  "Group Name": GroupNameType;
  "Group ID": GroupIDType;
  "Division Name": DivisionNameType;
  "Division ID": DivisionIDType;
  Plan: PlanType;
  "Plan ID": PlanIDType;
  "Place of Service": PlaceOfServiceType;
  "Claim Type": ClaimTypeType;
  "Procedure Code": string;
  "Member Gender": MemberGenderType;
  "Provider ID": string;
  "Provider Name": string;
};

type OutOfNetwork = {
  name: string;
  billing_code_type: string;
  billing_code_type_version: string;
  billing_code: string;
  description: string;
  allowed_amounts: AllowedAmount[];
};

type AllowedAmount = {
  tin: Tin;
  service_code: string[];
  billing_class: string;
  payments: Payment[];
};

type Tin = {
  type: string;
  value: string;
};

type Payment = {
  allowed_amount: number;
  billing_code_modifier: string[];
  providers: Provider[];
};

type Provider = {
  billed_charge: number;
  npi: number[];
};

export type JsonClaimType = {
  reporting_entity_name: string;
  reporting_entity_type: string;
  plan_name: string;
  plan_id_type: string;
  plan_id: string;
  plan_market_type: string;
  last_updated_on: string;
  version: string;
  out_of_network: OutOfNetwork[];
};
