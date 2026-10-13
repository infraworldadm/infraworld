export function Economics() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Economic model
          </h2>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              INFRA operates on a transaction-based economic model. Each transaction generates a fixed 10 AED fee, creating predictable revenue streams that fund network operations and validator incentives.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-6">Fee allocation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <ul className="space-y-3 text-muted-foreground">
                <li>• Network operations and maintenance</li>
                <li>• Validator compensation</li>
                <li>• Infrastructure development</li>
                <li>• Ecosystem growth programs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
