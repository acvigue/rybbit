import { useEffect } from "react";
import { authClient } from "@/lib/auth";
import { useGetSitesFromOrg } from "../api/admin/hooks/useSites";

export function useTrack() {
  const { data: activeOrganization, isPending: isPendingActiveOrganization } = authClient.useActiveOrganization();
  const {
    data: sites,
    isPending: isPendingSites,
    isLoading: isLoadingSites,
  } = useGetSitesFromOrg(activeOrganization?.id);

  const user = authClient.useSession();
  useEffect(() => {
    if (typeof window !== "undefined" && user.data?.user?.id && window?.rybbit && !isLoadingSites) {
      window.rybbit?.identify(user.data?.user?.id, {
        email: user.data?.user?.email,
        name: user.data?.user?.name,
        organization: activeOrganization?.name,
        sites: sites?.sites.map(site => site.domain),
      });
    }
  }, [user.data?.user?.id, isLoadingSites, isPendingActiveOrganization, isPendingSites]);
}
