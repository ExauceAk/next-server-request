import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import { ReactNode } from "react";

export default function PrivacyPolicyModals({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=" h-[90vh] w-2/3 max-w-[1200px]  ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Term of use</DialogTitle>
        </DialogHeader>
        <div className="sidebar h-[75vh] space-y-3 overflow-y-auto border-t border-[#B9B9B9] py-6 text-[#4B4B4B]">
          <p>
            These Terms of Use (&quot;Terms&quot;) govern your use of the [App Name]
            mobile application (the &quot;App&quot;) provided by [Company Name] (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;). By downloading, accessing, or using the App, you
            agree to be bound by these Terms. If you do not agree to these
            Terms, please do not use the App.
          </p>

          <p className="text-lg font-semibold text-[#151515]">
            1. Acceptance of Terms
          </p>

          <p>
            By accessing or using the App, you affirm that you are at least 18
            years old or have the legal capacity to enter into these Terms.
          </p>

          <p className="text-lg font-semibold text-[#151515]">
            2. Description of Services
          </p>

          <p>
            The App provides users with access to various dental-related
            services, including but not limited to appointment scheduling,
            dental health tracking, and educational resources.
          </p>

          <p className="text-lg font-semibold text-[#151515]">
            3. User accounts
          </p>

          <p>
            To use certain features of the App, you may need to create a user
            account. You agree to provide accurate and complete information when
            creating your account and to keep this information up-to-date. You
            are responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
          </p>

          <p className="text-lg font-semibold text-[#151515]">4. Our privacy</p>

          <p>
            Our [Privacy Policy](link to privacy policy) explains how we
            collect, use, and share your information. By using the App, you
            agree to our Privacy Policy.
          </p>

          <p className="text-lg font-semibold text-[#151515]">
            5. Use of the App
          </p>
          <div>
            <p>
              You agree to use the App in accordance with all applicable laws
              and regulations. You agree not to:
            </p>
            <ul>
              <ol>Use the App for any unlawful purpose.</ol>
              <ol>Use the App to transmit any harmful or malicious content.</ol>
              <ol>Interfere with or disrupt the operation of the App.</ol>
            </ul>
          </div>

          <p className="text-lg font-semibold text-[#151515]">
            6.Intellectual Property
          </p>

          <p>
            All content and materials available on the App, including but not
            limited to text, graphics, logos, and software, are the property of
            [Company Name] or its licensors and are protected by copyright,
            trademark, and other intellectual property laws. You agree not to
            reproduce, distribute, or create derivative works from any content
            without our prior written consent.
          </p>

          <p className="text-lg font-semibold text-[#151515]">7.Disclaimers</p>
          <p>
            The App and its content are provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. We make no representations or warranties of any
            kind, express or implied, regarding the App or its content. We do
            not warrant that the App will be uninterrupted or error-free.
          </p>

          <p className="text-lg font-semibold text-[#151515]">
            8. Limitation of Liability
          </p>

          <p>
            To the fullest extent permitted by law, [Company Name] shall not be
            liable for any indirect, incidental, special, or consequential
            damages arising out of or in connection with your use of the App,
            even if we have been advised of the possibility of such damages.
          </p>

          <p className="text-lg font-semibold text-[#151515]">
            9. Indemnification
          </p>

          <p>
            You agree to indemnify, defend, and hold harmless [Company Name],
            its affiliates, and their respective officers, directors, employees,
            and agents from and against any and all claims, liabilities,
            damages, losses, or expenses arising out of or in any way connected
            with your use of the App or your violation of these Terms.
          </p>

          <p className="text-lg font-semibold text-[#151515]">
            10. Termination
          </p>
          <p>
            We may terminate or suspend your access to the App at any time,
            without prior notice or liability, for any reason, including if you
            breach these Terms. Upon termination, your right to use the App will
            immediately cease.
          </p>

          <p className="text-lg font-semibold text-[#151515]">
            11. Governing Law
          </p>

          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the State of [State], without regard to its conflict of
            laws principles.
          </p>

          <p className="text-lg font-semibold text-[#151515]">
            12. Changes to These Terms
          </p>
          <p>
            We reserve the right to modify these Terms at any time. We will
            notify you of any changes by posting the new Terms on the App. Your
            continued use of the App after the effective date of the revised
            Terms constitutes your acceptance of the changes.
          </p>

          <p className="text-lg font-semibold text-[#151515]">13. Contact Us</p>

          <p>
            If you have any questions about these Terms, please contact us at
            [contact information].
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
