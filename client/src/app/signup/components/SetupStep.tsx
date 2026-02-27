import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useExtracted } from "next-intl";

import { isValidDomain } from "../../../lib/utils";

interface SetupStepProps {
  domain: string;
  setDomain: (v: string) => void;
  orgName: string;
  orgSlug: string;
  handleOrgNameChange: (v: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

export function SetupStep({
  domain,
  setDomain,
  orgName,
  orgSlug,
  handleOrgNameChange,
  isLoading,
  onSubmit,
}: SetupStepProps) {
  const t = useExtracted();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t("Set up your workspace")}</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">{t("Website Domain")}</Label>
          <Input
            id="domain"
            type="text"
            placeholder="example.com or sub.example.com"
            value={domain}
            onChange={e => setDomain(e.target.value.toLowerCase())}
            required
            className="h-10 transition-all bg-neutral-100 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700"
          />
          <p className="text-xs text-muted-foreground">
            {t("Enter the domain of the website you want to track")}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="orgName">{t("Organization Name")}</Label>
          <Input
            id="orgName"
            type="text"
            placeholder="Acme Inc."
            value={orgName}
            onChange={e => handleOrgNameChange(e.target.value)}
            required
            className="h-10 transition-all bg-neutral-100 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700"
          />
        </div>

        <Button
          className="w-full transition-all duration-300 h-11 bg-emerald-600 hover:bg-emerald-500 text-white"
          onClick={onSubmit}
          disabled={
            isLoading ||
            !orgName ||
            !orgSlug ||
            !domain ||
            !isValidDomain(domain)
          }
          variant="success"
        >
          {t("Continue")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
