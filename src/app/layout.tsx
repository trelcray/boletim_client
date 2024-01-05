import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "frontend challenge",
  description: "boletim frontend challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.variable}>
        <ModalProvider />
        <main
          className="flex min-h-screen w-full flex-col bg-gray-950 
         font-montserrat text-white"
        >
          {children}
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
