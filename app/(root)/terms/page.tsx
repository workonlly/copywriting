import React from "react";

export const metadata = {
  title: "Terms & Conditions | CopywritingWork",
  description: "Terms and Conditions for CopywritingWork platform",
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4 text-gray-600">
        <strong>Effective Date:</strong> [Insert Date]
      </p>

      <p className="mb-6">
        Welcome to <strong>CopywritingWork</strong>. These Terms & Conditions
        ("Terms") govern your access to and use of our platform, website,
        and services (collectively, the “Platform”).
      </p>

      <p className="mb-8">
        By accessing or using CopywritingWork, you agree to be bound by these
        Terms. If you do not agree, you may not use the Platform.
      </p>

      <Section title="1. Eligibility">
        <p>
          You must be at least 18 years old to use CopywritingWork. By creating
          an account, you represent and warrant that you meet this requirement.
        </p>
      </Section>

      <Section title="2. Platform Services">
        <p>
          CopywritingWork is a customer-to-customer freelance marketplace that
          connects clients and freelancers. We facilitate contracts and
          payments but are not a party to agreements between users.
        </p>
      </Section>

      <Section title="3. User Accounts">
        <ul className="list-disc ml-6 space-y-2">
          <li>You are responsible for maintaining account confidentiality.</li>
          <li>You agree to provide accurate and current information.</li>
          <li>You are responsible for all activities under your account.</li>
        </ul>
      </Section>

      <Section title="4. Payments & Fees">
        <p>
          Payments are processed through third-party payment providers.
          CopywritingWork may charge service fees or commissions, which will
          be disclosed before completing a transaction.
        </p>
      </Section>

      <Section title="5. User Conduct">
        <ul className="list-disc ml-6 space-y-2">
          <li>No illegal, fraudulent, or abusive behavior.</li>
          <li>No infringement of intellectual property rights.</li>
          <li>No circumvention of platform fees.</li>
          <li>No harassment or harmful conduct toward other users.</li>
        </ul>
      </Section>

      <Section title="6. Intellectual Property">
        <p>
          Users retain ownership of their work unless otherwise agreed between
          client and freelancer. The platform’s branding, logo, and content are
          owned by CopywritingWork and may not be used without permission.
        </p>
      </Section>

      <Section title="7. Dispute Resolution">
        <p>
          Users are encouraged to resolve disputes directly. CopywritingWork
          may offer dispute assistance but does not guarantee outcomes.
        </p>
      </Section>

      <Section title="8. Account Suspension or Termination">
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these Terms or engage in harmful activity.
        </p>
      </Section>

      <Section title="9. Limitation of Liability">
        <p>
          CopywritingWork is provided "as is" without warranties of any kind.
          We are not liable for indirect, incidental, or consequential damages
          arising from use of the Platform.
        </p>
      </Section>

      <Section title="10. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of the
          Platform after updates constitutes acceptance of the revised Terms.
        </p>
      </Section>

      <Section title="11. Governing Law">
        <p>
          These Terms shall be governed by the laws of [Insert Country/State],
          without regard to conflict of law principles.
        </p>
      </Section>

      <Section title="12. Contact Information">
        <p>
          <strong>Company Name:</strong> [Your Legal Business Name]
        </p>
        <p>
          <strong>Email:</strong> [Your Email Address]
        </p>
        <p>
          <strong>Address:</strong> [Business Address]
        </p>
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
