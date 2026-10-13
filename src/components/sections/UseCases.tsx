import { Card } from "@/components/ui/card";

export function UseCases() {
  return (
    <section id="usecases" className="bg-background py-20">
      <div className="w-full h-[694px] relative bg-muted">
      </div>

      <div className="mx-auto w-full max-w-[1472px] px-4 sm:px-8 lg:px-24 xl:px-32">
        <div className="mt-16 relative h-[757px] overflow-hidden rounded-[12px] bg-muted p-10">
          <h2 className="text-[45px] font-semibold text-foreground">
            Enterprise tokenization &amp; custom stablecoins
          </h2>
          <p className="mt-6 text-[22px] font-normal leading-[28px] text-foreground">
            INFRA supports enterprise programs to launch tokens and stable-value instruments with predictable network costs and Dirham-denominated settlement via reAED.
          </p>
          <p className="mt-4 text-[22px] font-normal leading-[28px] text-foreground">
            Programs are designed for commercial deployment: operational onboarding, reporting exports, and controlled rollouts through enterprise and partner channels.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-[15px] lg:gap-y-[15px]">
          <Card className="row-span-2 p-8 border-border">
            <img src="/icons/database.svg" alt="" className="h-10 w-10 object-contain" />
            <p className="mt-6 text-[18px] font-medium leading-[18px] text-muted-foreground">
              Launch custom tokens representing internal credits, loyalty units, or asset-backed value—operated under your rules and reporting requirements.
            </p>
          </Card>

          <Card className="h-[218px] p-8 border-border">
            <img src="/icons/coin.svg" alt="" className="h-10 w-10 object-contain" />
            <h4 className="mt-4 text-[22px] font-semibold text-foreground leading-tight">
              Custom stablecoins
            </h4>
            <p className="mt-3 text-[18px] font-medium leading-[18px] text-muted-foreground">
              Issue branded stable-value instruments with Dirham-denominated settlement and predictable network costs.
            </p>
          </Card>

          <Card className="row-span-2 p-8 border-border">
            <img src="/icons/clipboard-check.svg" alt="" className="h-10 w-10 object-contain" />
            <p className="mt-6 text-[18px] font-medium leading-[18px] text-muted-foreground">
              A managed path for setup and go-live, designed for enterprise timelines and controlled deployments.
            </p>
          </Card>

          <Card className="h-[218px] p-8 border-border">
            <img src="/icons/users-group.svg" alt="" className="h-10 w-10 object-contain" />
            <h4 className="mt-4 text-[22px] font-semibold text-foreground leading-tight">
              Partner distribution
            </h4>
            <p className="mt-3 text-[18px] font-medium leading-[18px] text-muted-foreground">
              Scale via fintech and payment partners with onboarding, SLAs, and reporting exports for high-throughput integrators.
            </p>
          </Card>

          <Card className="h-[209px] p-8 border-border">
            <h4 className="text-[22px] font-semibold text-foreground leading-tight">
              Program-based settlement
            </h4>
            <p className="mt-4 text-[18px] font-medium leading-[18px] text-muted-foreground">
              Run token programs with clear settlement reporting and auditable on-chain flows suitable for enterprise finance teams.
            </p>
          </Card>

          <Card className="h-[209px] p-8 border-border">
            <img src="/icons/shield-check.svg" alt="" className="h-10 w-10 object-contain" />
            <h4 className="mt-4 text-[22px] font-semibold text-foreground leading-tight">
              Managed token programs
            </h4>
            <p className="mt-3 text-[18px] font-medium leading-[18px] text-muted-foreground">
              Contract-based enterprise programs with recurring platform services and usage-linked economics for anchor tenants.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}