"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterWrapper() {
  const pathname = usePathname();

  // Nao exibe o footer nas paginas de administracao
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}
