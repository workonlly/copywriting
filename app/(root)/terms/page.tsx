import React from "react";

export const metadata = {
  title: "Terms & Conditions | CopywritingWork",
  description: "Terms and Conditions for CopywritingWork platform - Student freelance marketplace",
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4 text-gray-600">
        <strong>Effective Date:</strong> 14/02/2026
      </p>

      <p className="mb-6">
        Welcome to <strong>CopywritingWork</strong>, a platform founded by CEO Vishal. These Terms of Service ("Terms") govern your access to and use of our website and services (collectively, the "Platform").
      </p>

      <p className="mb-8">
        By accessing or using CopywritingWork, you agree to be bound by these Terms. If you do not agree, you may not use the Platform.
      </p>

      <Section title="1. Acceptance of Terms">
        <p>By accessing or using CopywritingWork, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
      </Section>

      <Section title="2. Eligibility">
        <p>You must:</p>
        <ul className="list-disc ml-6 space-y-2 mt-2">
          <li>Be at least 18 years old (or have legal consent)</li>
          <li>Be a college student or authorized user</li>
          <li>Provide accurate information during registration</li>
        </ul>
      </Section>

      <Section title="3. Account Registration">
        <p>You may create an account using Google OAuth. You are responsible for:</p>
        <ul className="list-disc ml-6 space-y-2 mt-2">
          <li>Maintaining account security</li>
          <li>Not impersonating others or providing false information</li>
        </ul>
      </Section>

      <Section title="4. Platform Usage">
        <p>Our platform allows students to:</p>
        <ul className="list-disc ml-6 space-y-2 mt-2">
          <li>Exchange goods and resources</li>
          <li>Share notes</li>
          <li>Offer paid help or services</li>
        </ul>
        <p className="mt-4">You agree not to:</p>
        <ul className="list-disc ml-6 space-y-2 mt-2">
          <li>Violate college rules or local laws</li>
          <li>Post illegal, harmful, or misleading content</li>
          <li>Harass, scam, or exploit other users</li>
        </ul>
      </Section>

      <Section title="5. Academic Responsibility Disclaimer">
        <p>Users are solely responsible for ensuring their actions comply with their institution's academic policies, local laws, and regulations. We are a platform provider, not a party to user transactions.</p>
      </Section>

      <Section title="6. Payments & Transactions">
        <p>Transactions are conducted between users directly. We are not responsible for disputes, quality, or delivery of services. Any payment features may be subject to additional terms.</p>
      </Section>

      <Section title="7. Account Termination">
        <p>We reserve the right to suspend or terminate accounts and remove content that violates these terms, including acting without notice in cases of abuse or illegal activity.</p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>To the maximum extent permitted by law, we are not liable for indirect or consequential damages. Use of the platform is at your own risk.</p>
      </Section>

      <Section title="9. Changes to Terms">
        <p>We may update these Terms at any time. Continued use means acceptance of the updated terms.</p>
      </Section>

      <Section title="10. Governing Law">
        <p>These Terms are governed by the laws of India.</p>
      </Section>

      <Section title="11. Contact Information">
        <div className="space-y-2">
          <p><strong>Company:</strong> Copywriting</p>
          <p><strong>Email:</strong> <a href="mailto:45anku@gmail.com" className="text-blue-600 hover:underline">45anku@gmail.com</a></p>
        </div>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}
