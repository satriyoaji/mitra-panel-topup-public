import RootTemplateLayout from "./root-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-repeat antialiased">
        <RootTemplateLayout>{children}</RootTemplateLayout>
      </body>
    </html>
  );
}
