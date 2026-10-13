import { Card } from "@/components/ui/card";

const pillars = [
  {
    number: "1",
    title: "Fixed cost per transaction: 10 AED",
    description: "Every transaction has a stable, transparent cost—independent of congestion and market conditions.",
  },
  {
    number: "2",
    title: "reAED: the Dirham-native digital currency",
    description: "reAED is pegged 1:1 to AED and designed for payments, fees, and settlement across the ecosystem.",
  },
  {
    number: "3",
    title: "Transparent, auditable flows",
    description: "Transactions and fee distributions are visible and verifiable, enabling oversight, reporting, and accountability.",
  },
  {
    number: "4",
    title: "Institutional-grade operations",
    description: "INFRA is designed to run as critical infrastructure, with dedicated components and ongoing operational ownership.",
  },
];

export function InfraModel() {
  return (
    <section id="economics" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Core infrastructure features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <Card key={index} className="p-8 border-border relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {pillar.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
