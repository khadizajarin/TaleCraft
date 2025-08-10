import Page from "@/app/homepage/page"; // The wrapper with Dashboard and children

export default function DashboardLayout({ children }) {
  return <Page>{children}</Page>;
}
