// app/refund-policy/page.tsx
import React from "react";

export default function RefundPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Refund and Cancellation Policy</h1>
      <p className="text-gray-600 mb-2">Effective Date: 14/02/2026</p>
      <p className="text-gray-600 mb-6">
        Website: <a href="https://www.copywriting.work/" className="text-blue-600 underline">https://www.copywriting.work/</a>
      </p>
      <p className="mb-6">
        At <strong>Copywriting</strong>, we strive to provide a transparent and fair experience for all users of our platform. 
        This Refund and Cancellation Policy explains the terms under which payments, cancellations, and refunds are handled when using our services.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">1. Nature of Services</h2>
          <p>
            Copywriting operates as an online platform that enables users to purchase credits/tokens and use them for accessing platform features such as sharing resources, posting services, or interacting with other users on the platform. Payments made on the platform are primarily used to purchase digital credits or access digital services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. No Refund Policy</h2>
          <p>
            Due to the nature of digital services and credits, all purchases made on the platform are generally non-refundable once the transaction has been successfully completed and the credits or services have been delivered to the user’s account.
          </p>
          <p>Refunds will not be issued for:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Change of mind after purchase</li>
            <li>Unused credits</li>
            <li>Incorrect purchase by the user</li>
            <li>Failure to use the service within a certain period</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. Duplicate or Failed Transactions</h2>
          <p>
            If a payment is deducted from your bank account but credits are not added to your account due to a technical issue, you may contact our support team within 3 days of the transaction.
          </p>
          <p>After verification, we may either:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Add the missing credits to your account</li>
            <li>Issue a refund if the transaction cannot be completed</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Fraudulent or Unauthorized Transactions</h2>
          <p>
            If we detect suspicious, fraudulent, or unauthorized activity associated with a payment, Copywriting reserves the right to:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Suspend the user account</li>
            <li>Reverse credits issued from such transactions</li>
            <li>Investigate the activity before issuing any refund</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. Cancellation Policy</h2>
          <p>
            Users may cancel actions or requests on the platform before a transaction is completed. Once payment has been successfully processed and credits have been issued, the transaction cannot be cancelled.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. Platform Errors</h2>
          <p>
            In rare cases where a technical error results in an incorrect charge or service failure, users should report the issue to our support team. We will review the matter and take appropriate action, which may include issuing credits or processing a refund.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. Processing Time</h2>
          <p>
            If a refund is approved, it may take 5–10 business days for the amount to reflect in the user’s original payment method, depending on the bank or payment provider.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
          <p>
            Copywriting reserves the right to update or modify this Refund and Cancellation Policy at any time. Users are encouraged to review this page periodically for any changes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">9. Contact Us</h2>
          <p>
            If you have any questions regarding refunds, cancellations, or payment-related issues, please contact us at:
          </p>
          <p>Email: <a href="mailto:45anku@gmail.com" className="text-blue-600 underline">45anku@gmail.com</a></p>
          <p>Website: <a href="https://www.copywriting.work/" className="text-blue-600 underline">https://www.copywriting.work/</a></p>
        </div>
      </section>

      <p className="mt-8 text-gray-700">
        By using the services provided by Copywriting, you agree to this Refund and Cancellation Policy.
      </p>
    </main>
  );
}