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
      <div className={`w-full flex justify-center`}>
        <div
          className={`min-h-screen md:max-w-6xl bg-background pt-2 pb-4 w-full`}
        >
          {children}
        </div>
        <BottomNav />
      </div>
      <Footer />
      <HelpButton />
      <Toaster />
    </>
  );
}
