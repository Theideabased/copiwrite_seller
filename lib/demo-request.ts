export const leadSources = ["Phone calls", "Website", "Google Ads", "Meta Ads", "Email", "Social media", "Referrals", "Other"];
export const automationNeeds = ["Lead qualification", "Lead follow-up", "Missed calls", "Appointment booking", "Customer conversations", "Old lead reactivation", "Not sure yet"];
export const industries = ["HVAC", "Plumbing", "Roofing", "Other home services", "Dental practice", "Med spa", "Agency", "Other"];
export type DemoField = "name" | "email" | "company" | "businessWebsite" | "industry" | "leadSource" | "service" | "message";
export type DemoErrors = Partial<Record<DemoField, string>>;

export function validateDemo(data: Record<string, unknown>): DemoErrors {
  const value = (key: string) => typeof data[key] === "string" ? data[key].trim() : "";
  const errors: DemoErrors = {};
  if (value("name").length < 2) errors.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(value("email"))) errors.email = "Enter a valid business email.";
  if (!value("company")) errors.company = "Enter your company name.";
  if (value("businessWebsite")) {
    try {
      const website = new URL(value("businessWebsite"));
      if (!["https:", "http:"].includes(website.protocol) || !website.hostname.includes(".")) throw new Error();
    } catch { errors.businessWebsite = "Use a full website address, like https://example.com."; }
  }
  if (!industries.includes(value("industry"))) errors.industry = "Choose your industry.";
  if (!leadSources.includes(value("leadSource"))) errors.leadSource = "Choose your main lead source.";
  if (!automationNeeds.includes(value("service"))) errors.service = "Choose what you would like to automate.";
  if (value("message").length < 20) errors.message = "Tell us a little more (at least 20 characters).";
  return errors;
}
