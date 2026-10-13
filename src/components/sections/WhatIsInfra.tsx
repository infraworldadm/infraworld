export function WhatIsInfra() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            What INFRA is
          </h2>

          <div className="prose prose-lg max-w-none text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              INFRA is a digital infrastructure layer that enables businesses and institutions to move value on-chain with the same expectations they have in traditional finance: stable unit of account, predictable costs, and transparent settlement.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              INFRA uses blockchain technology as the underlying system of record, while presenting a familiar economic model: Dirham-denominated settlement using reAED and a fixed 10 AED transaction cost enforced by the network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
