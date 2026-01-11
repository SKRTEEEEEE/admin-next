import { SiteHeaderConfig } from "@log-ui/lib/config/apps-config";
import Image from "next/image";

/**
 * Site configuration specific to admin-next
 * This config is used by log-ui-ts SiteHeader component
 */
export const siteConfig: SiteHeaderConfig = {
  name: "Admin Panel",
  icon: <Image src="/favicon.ico" alt="Admin Logo" width={24} height={24} />,
  paths: [
    {
      id: "gradients",
      path: "/gradients",
    },
  ],
};
