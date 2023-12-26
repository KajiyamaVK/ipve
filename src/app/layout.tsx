import { ReactNode } from "react";
import { GeneralContextProvider } from "@/contexts/generalContext";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "IPVE",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <GeneralContextProvider>
        <body suppressHydrationWarning={true}>
          <Toaster />
          {children}
        </body>
      </GeneralContextProvider>
    </html>
  );
}
