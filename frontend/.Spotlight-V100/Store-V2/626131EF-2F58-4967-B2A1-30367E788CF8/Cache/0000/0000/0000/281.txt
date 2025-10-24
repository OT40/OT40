import OtpForm from "@/components/auth/OtpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js Two Step Verification Page | Organisation Technology and Service Management Fraework Template",
  description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
  // other metadata
};

export default function OtpVerification() {
  return <OtpForm />;
}
