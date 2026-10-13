import { Card } from "@/components/ui/card";

const solutions = [
  {
    title: "Payments & merchant settlement",
    description: "Accept and settle with stable Dirham-denominated value.",
  },
  {
    title: "B2B settlement rails",
    description: "Move value between business entities with predictable costs and traceable settlement.",
  },
  {
    title: "Tokenized loyalty and rewards",
    description: "Issue loyalty units or credits with configurable rules, while settling in reAED.",
  },
  {
    title: "Enterprise tokenization",
    description: "Deploy tokens representing internal credits, asset-backed units, or branded payment instruments—using shared infrastructure.",
  },
  {
    title: "Developer and partner ecosystems",
    description: "Build apps that rely on stable fees and predictable economics.",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Infrastructure applications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="p-6 border-border">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
