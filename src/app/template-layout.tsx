import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import HelpButton from "@/components/help-button";
import BottomNav from "@/components/bottom-nav";
import PageHeaderWrapper from "@/components/header/page-header-wrapper";
import PWAAlert from "@/components/header/pwa-header";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PWAAlert />
      <PageHeaderWrapper />
      <div className={`md:container md:max-w-7xl`}>
        <div className={`min-h-screen bg-background pt-2`}>{children}</div>
        <BottomNav />
      </div>
      <Footer />
      <HelpButton />
      <Toaster />
    </>
  );
}
