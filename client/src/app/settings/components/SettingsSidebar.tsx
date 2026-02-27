"use client";
import { Building2, UserCircle } from "lucide-react";
import { useExtracted } from "next-intl";
import { usePathname } from "next/navigation";
import { Sidebar } from "../../../components/sidebar/Sidebar";

export function SettingsSidebar() {
  const t = useExtracted();
  const pathname = usePathname();

  return (
    <Sidebar.Root>
      <Sidebar.Title>{t("Settings")}</Sidebar.Title>
      <Sidebar.Items>
        <Sidebar.Item
          label={t("Account")}
          active={pathname.startsWith("/settings/account")}
          href={"/settings/account"}
          icon={<UserCircle className="w-4 h-4" />}
        />
        <Sidebar.Item
          label={t("Organization")}
          active={pathname.startsWith("/settings/organization/members")}
          href={"/settings/organization"}
          icon={<Building2 className="w-4 h-4" />}
        />
      </Sidebar.Items>
    </Sidebar.Root>
  );
}
