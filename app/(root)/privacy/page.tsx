import React from "react";

export const metadata = {
  title: "Privacy Policy | CopywritingWork",
  description: "Privacy Policy for CopywritingWork - Student freelance marketplace platform",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-gray-600">
        <strong>Effective Date:</strong> 14/02/2026
      </p>

      <p className="mb-6">
        Welcome to <strong>CopywritingWork</strong>, founded by CEO Vishal. CopywritingWork (“Company,” “we,” “our,” or “us”) is a student-to-student platform that connects college students for exchanging notes, resources, and freelance services.
      </p>

      <p className="mb-8">
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Platform"). By using our Platform, you agree to this Privacy Policy.
      </p>

      <Section title="1. Information We Collect">
        <ul className="list-disc ml-6 space-y-2">
          <li>Full name and college details</li>
          <li>Email address (via Google OAuth)</li>
          <li>Profile information (bio, skills, academic focus)</li>
          <li>Transaction and payment information</li>
          <li>IP address and device information</li>
          <li>Usage data and cookies</li>
        </ul>
      </Section>

      <Section title="2. How We Use Your Information">
        <ul className="list-disc ml-6 space-y-2">
          <li>Create and manage student accounts</li>
          <li>Facilitate student-to-student transactions</li>
          <li>Process payments between users</li>
          <li>Provide platform support</li>
          <li>Improve student experience</li>
          <li>Prevent fraud and enforce terms</li>
        </ul>
      </Section>

      <Section title="3. Sharing of Information">
        <p>
          We share information with: service providers (hosting, payments), legal authorities when required by law, and other students as part of public profiles (name, reviews, ratings). We do <strong>not sell</strong> your personal data.
        </p>
      </Section>

      <Section title="4. Data Retention">
        <p>
          We retain information while your account is active and as needed for legal obligations, dispute resolution, and platform operations.
        </p>
      </Section>

      <Section title="5. Cookies & Tracking">
        <p>
          We use cookies for session management, analytics, and improving user experience. You can manage cookie preferences in your browser settings.
        </p>
      </Section>

      <Section title="6. Data Security">
        <p>
          We use industry-standard security measures to protect your data. However, no online platform can guarantee absolute security.
        </p>
      </Section>

      <Section title="7. Your Rights">
        <p>
          You can request access, correction, or deletion of your data. Contact us at the email below to exercise your rights.
        </p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>
          CopywritingWork is for college students 18+ only. We do not knowingly collect data from minors under 18.
        </p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>
          We may update this policy. Changes will be posted here with a new effective date. Continued use constitutes acceptance.
        </p>
      </Section>

      <Section title="10. Contact Information">
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <p><strong>Company:</strong> Copywriting</p>
          <p>
            <strong>Email:</strong> 
            <a href="mailto:45anku@gmail.com" className="text-blue-600 hover:underline font-semibold ml-1">
              45anku@gmail.com
            </a>
          </p>
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
