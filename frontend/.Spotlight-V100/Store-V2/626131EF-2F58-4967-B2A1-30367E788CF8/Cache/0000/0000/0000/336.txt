import InvoiceMain from "@/components/invoice/InvoiceMain";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Single Invoice | Organisation Technology and Service Management Fraework Template",
  description:
    "This is Next.js E-commerce  Single Invoice TailAdmin Dashboard Template",
};

export default function SingleInvoicePage() {
  return (
    <div>
      <InvoiceMain />
    </div>
  );
}
