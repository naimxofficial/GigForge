'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">About GigForge</h1>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p>
              GigForge connects talented freelancers with businesses and individuals who need their services.
              We believe in creating a transparent, secure, and efficient marketplace for remote work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p>
              To become the world&apos;s most trusted freelance marketplace, empowering millions of people to
              work on their own terms and achieve their professional goals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Trust - We build trust through transparency and security</li>
              <li>Excellence - We strive for the highest quality in everything we do</li>
              <li>Community - We support and grow together as a community</li>
              <li>Innovation - We continuously improve and innovate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Verified freelancers and secure payments</li>
              <li>Wide variety of services and expertise</li>
              <li>24/7 customer support</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Project management tools built-in</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold text-rose-600">10K+</p>
                <p>Freelancers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-500">25K+</p>
                <p>Active Gigs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500">500M+</p>
                <p>Earned Globally</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
