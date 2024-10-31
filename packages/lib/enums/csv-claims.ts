export enum Field {
  ClaimID = "Claim ID",
  SubscriberID = "Subscriber ID",
  MemberSequence = "Member Sequence",
  ClaimStatus = "Claim Status",
  Billed = "Billed",
  Allowed = "Allowed",
  Paid = "Paid",
  PaymentStatusDate = "Payment Status Date",
  ServiceDate = "Service Date",
  ReceivedDate = "Received Date",
  EntryDate = "Entry Date",
  ProcessedDate = "Processed Date",
  PaidDate = "Paid Date",
  PaymentStatus = "Payment Status",
  GroupName = "Group Name",
  GroupID = "Group ID",
  DivisionName = "Division Name",
  DivisionID = "Division ID",
  Plan = "Plan",
  PlanID = "Plan ID",
  PlaceOfService = "Place of Service",
  ClaimType = "Claim Type",
  ProcedureCode = "Procedure Code",
  MemberGender = "Member Gender",
  ProviderID = "Provider ID",
  ProviderName = "Provider Name",
}

export enum ClaimStatus {
  Denied = "Denied",
  PartialDeny = "Partial Deny",
  Payable = "Payable",
}

export enum PaymentStatus {
  Paid = "Paid",
}

export enum GroupName {
  AcmeCorporation = "Acme Corporation",
  CityGovernment = "City Government",
  EducationAlliance = "Education Alliance",
  GlobalEnterprises = "Global Enterprises",
  TechSolutionsInc = "TechSolutions Inc.",
}

export enum GroupID {
  ACM001 = "ACM001",
  CGV004 = "CGV004",
  EDA005 = "EDA005",
  GLE003 = "GLE003",
  TSI002 = "TSI002",
}

export enum DivisionName {
  East = "East",
  North = "North",
  South = "South",
  West = "West",
}

export enum DivisionID {
  E = "E",
  N = "N",
  S = "S",
  W = "W",
}

export enum Plan {
  BasicHealthPlan = "Basic Health Plan",
  FamilyCoveragePlan = "Family Coverage Plan",
  PremiumCarePlan = "Premium Care Plan",
  SeniorWellnessPlan = "Senior Wellness Plan",
  YoungAdultPlan = "Young Adult Plan",
}

export enum PlanID {
  BHP001 = "BHP001",
  FCP003 = "FCP003",
  PCP002 = "PCP002",
  SWP004 = "SWP004",
  YAP005 = "YAP005",
}

export enum PlaceOfService {
  EmergencyRoomHospital = "Emergency Room - Hospital",
  InpatientHospital = "Inpatient Hospital",
  OutpatientHospital = "Outpatient Hospital",
}

export enum ClaimType {
  Institutional = "Institutional",
  Professional = "Professional",
}

export enum MemberGender {
  Female = "Female",
  Male = "Male",
}
