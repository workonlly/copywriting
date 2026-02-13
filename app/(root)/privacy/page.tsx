import React from "react";

export const metadata = {
  title: "Privacy Policy | CopywritingWork",
  description: "Privacy Policy for CopywritingWork platform",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-gray-600">
        <strong>Effective Date:</strong> [Insert Date]
      </p>

      <p className="mb-6">
        Welcome to <strong>CopywritingWork</strong> (“Company,” “we,” “our,” or
        “us”). CopywritingWork is a customer-to-customer freelance marketplace
        that connects clients with copywriters and freelance professionals.
      </p>

      <p className="mb-8">
        This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our website, application, or
        services (collectively, the “Platform”). By using our Platform, you
        agree to this Privacy Policy.
      </p>

      <Section title="1. Information We Collect">
        <ul className="list-disc ml-6 space-y-2">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Profile information (bio, skills, portfolio)</li>
          <li>Billing and payment information</li>
          <li>Government ID (if required for verification)</li>
          <li>IP address and device information</li>
          <li>Usage data and cookies</li>
        </ul>
      </Section>

      <Section title="2. How We Use Your Information">
        <ul className="list-disc ml-6 space-y-2">
          <li>Create and manage accounts</li>
          <li>Facilitate customer-to-customer contracts</li>
          <li>Process payments</li>
          <li>Provide customer support</li>
          <li>Improve platform functionality</li>
          <li>Prevent fraud and enforce terms</li>
        </ul>
      </Section>

      <Section title="3. Sharing of Information">
        <p>
          We may share information with service providers (hosting, payment
          processors, analytics), legal authorities when required by law, and
          other users as part of your public profile (e.g., name, reviews,
          portfolio). We do not sell your personal data.
        </p>
      </Section>

      <Section title="4. Data Retention">
        <p>
          We retain your information as long as your account is active and as
          necessary to comply with legal obligations, resolve disputes, and
          enforce agreements.
        </p>
      </Section>

      <Section title="5. Cookies & Tracking">
        <p>
          We use cookies to improve user experience, remember sessions, and
          analyze platform performance. You may disable cookies in your browser
          settings.
        </p>
      </Section>

      <Section title="6. Data Security">
        <p>
          We implement reasonable technical and organizational measures to
          protect your personal information. However, no system is completely
          secure.
        </p>
      </Section>

      <Section title="7. User Rights">
        <p>
          Depending on your location, you may have rights to access, correct,
          or delete your data. To exercise your rights, contact us at:
        </p>
        <p className="mt-2 font-semibold">[Insert Contact Email]</p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>
          CopywritingWork is not intended for individuals under 18 years of
          age. We do not knowingly collect data from minors.
        </p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>
          We may update this Privacy Policy periodically. Updates will be
          posted on this page with a revised effective date.
        </p>
      </Section>

      <Section title="10. Contact Us">
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
