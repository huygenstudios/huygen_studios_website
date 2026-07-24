import type { Metadata } from "next";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | Huygen Studios",
  description: "Read the Cookie Policy of Huygen Studios to understand what cookies we use on our website and how to manage your preferences.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-12">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">Last Updated: July 23, 2026</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">Cookie Policy</h1>
            <p className="text-lg text-[#b8bac1] leading-relaxed">
              This policy explains what cookies <strong>www.huygenstudios.com</strong> uses, why we use them, and how you can control them.
            </p>
          </div>

          <div className="max-w-[900px] border-t border-[rgba(255,255,255,0.18)] pt-12 space-y-8 text-sm text-[#b8bac1] leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work or work more efficiently, and to provide information to the site owner.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse mt-2">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.1)]">
                      <th className="text-left text-white py-2 pr-4 font-semibold">Type</th>
                      <th className="text-left text-white py-2 pr-4 font-semibold">Provider</th>
                      <th className="text-left text-white py-2 pr-4 font-semibold">Purpose</th>
                      <th className="text-left text-white py-2 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                    <tr>
                      <td className="py-2 pr-4 text-white">Essential</td>
                      <td className="py-2 pr-4">Huygen Studios</td>
                      <td className="py-2 pr-4">Stores your cookie choice locally so the preference notice does not reappear on every page.</td>
                      <td className="py-2">Until browser storage is cleared</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-white">Analytics</td>
                      <td className="py-2 pr-4">Google Analytics</td>
                      <td className="py-2 pr-4">Measures website traffic and user behaviour to improve performance. It loads only after you choose “Accept analytics.”</td>
                      <td className="py-2">Up to 2 years</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-white">Advertising</td>
                      <td className="py-2 pr-4">Google AdSense</td>
                      <td className="py-2 pr-4">Used to serve relevant ads and measure ad performance. Set by Google when AdSense ads are displayed on this website.</td>
                      <td className="py-2">Up to 2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Managing Your Cookie Preferences</h2>
              <p className="mb-3">
                When you first visit, choose <strong>Essential only</strong> or <strong>Accept analytics</strong>. You can reset that choice by clearing site data for huygenstudios.com. You can also control cookies in these ways:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Browser settings:</strong> Most browsers allow you to block or delete cookies. Visit your browser&apos;s help section for instructions (e.g.,{" "}
                  <a href="https://support.google.com/chrome/answer/95647" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Chrome</a>,{" "}
                  <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Firefox</a>,{" "}
                  <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Safari</a>
                  ).
                </li>
                <li>
                  <strong>Google Analytics opt-out:</strong> Install the{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
                </li>
                <li>
                  <strong>Google AdSense / personalised ads opt-out:</strong> Manage your preferences via{" "}
                  <a href="https://www.google.com/settings/ads" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>{" "}
                  or the{" "}
                  <a href="https://optout.aboutads.info/" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance opt-out</a>.
                </li>
              </ul>
              <p className="mt-3 text-[#93969e] text-xs">
                Note: disabling essential cookies may prevent some parts of the website from working correctly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Contact Us</h2>
              <p>
                For questions about this Cookie Policy, contact:<br />
                <a href="mailto:hello@huygenstudios.com" className="text-white underline hover:text-[#4a79ff] transition-colors">
                  hello@huygenstudios.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
