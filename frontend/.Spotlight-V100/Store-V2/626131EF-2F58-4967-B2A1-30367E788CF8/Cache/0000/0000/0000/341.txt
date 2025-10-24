import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddProductForm from "@/components/ecommerce/AddProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Add Product | Organisation Technology and Service Management Fraework Template",
  description:
    "This is Next.js E-commerce  Add Product  TailAdmin Dashboard Template",
};

export default function AddProductPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Add Products" />
      <AddProductForm />
    </div>
  );
}
