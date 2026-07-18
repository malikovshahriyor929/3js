import { Logo } from "@/components/layout/Logo";
import { ScrollLink } from "@/components/ui/ScrollLink";
import { companyConfig } from "@/config/company";

const footerNav = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Technology", href: "#technology" },
  { label: "Coverage", href: "#coverage" },
  { label: "Track a Shipment", href: "#tracking" },
  { label: "Get a Freight Quote", href: "#quote" },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line-dark bg-navy-deep">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-muted-dark">
            {companyConfig.name} is an asset-based trucking company and
            third-party logistics provider headquartered in{" "}
            {companyConfig.headquarters}, moving freight across{" "}
            {companyConfig.coverage} on company-owned equipment — with vetted
            partner capacity reserved for overflow.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="label mb-5 text-white/45">Explore</h2>
          <ul className="space-y-2.5">
            {footerNav.map((link) => (
              <li key={link.href}>
                <ScrollLink
                  href={link.href}
                  className="text-[0.95rem] text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label mb-5 text-white/45">Contact</h2>
          <ul className="space-y-2.5 text-[0.95rem] text-white/75">
            <li>{companyConfig.headquarters}</li>
            <li>Serving {companyConfig.coverage} nationwide</li>
            {companyConfig.phone && <li>{companyConfig.phone}</li>}
            {companyConfig.email && <li>{companyConfig.email}</li>}
            {companyConfig.address && <li>{companyConfig.address}</li>}
          </ul>
          <div className="mt-6 flex gap-5 text-sm text-white/50">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {companyConfig.name}. All rights
            reserved.
          </p>
          <p>
            3D truck model:{" "}
            <a
              href="https://sketchfab.com/3d-models/semi-truck-4085d2ca2b534eaca0f45bb9a4164546"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/70"
            >
              “semi truck” by zairiq-123
            </a>{" "}
            (CC BY 4.0)
          </p>
        </div>
      </div>
    </footer>
  );
}
