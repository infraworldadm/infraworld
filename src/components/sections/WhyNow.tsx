import { Card } from "@/components/ui/card";

const challenges = [
  {
    title: "Variable costs",
    description: "Dynamic gas pricing creates uncertainty in operational budgeting.",
  },
  {
    title: "Asset volatility",
    description: "Cryptocurrency-denominated transactions complicate financial reporting.",
  },
  {
    title: "Performance variability",
    description: "Network congestion affects transaction reliability and timing.",
  },
  {
    title: "Economic unpredictability",
    description: "Speculative incentives don't align with infrastructure requirements.",
  },
];

export function WhyNow() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Infrastructure challenges in current networks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} className="p-8 border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {challenge.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {challenge.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
