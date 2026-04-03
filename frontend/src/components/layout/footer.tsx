import Link from "next/link";

type FooterProps = {
  companyName?: string;
  year?: number;
};

export default function Footer({
  companyName = "Hệ Thống Giám Sát",
  year = 2026,
}: FooterProps) {
  return (
    <footer
      role="contentinfo"
      className="shrink-0 flex flex-col items-center justify-center gap-4 border-t border-border bg-background px-4 py-4 shadow-inner transition-colors sm:px-8 md:flex-row md:justify-between md:gap-6"
    >
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:gap-6 md:w-auto md:justify-start">
        <p className="text-xs font-medium text-muted-foreground">
          &copy; {year} {companyName}.
        </p>
      </div>

      <nav aria-label="Footer navigation" className="flex gap-4">
        <Link
          href="/privacy"
          aria-label="Privacy Policy"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Privacy
        </Link>

        <Link
          href="/terms"
          aria-label="Terms of Service"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Terms
        </Link>
      </nav>
    </footer>
  );
}