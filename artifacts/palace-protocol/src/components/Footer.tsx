import { Link } from "wouter";
import { SealLogo } from "./SealLogo";

export function Footer() {
  return (
    <footer className="bg-ink border-t border-line py-11">
      <div className="max-w-wrap flex flex-col items-start gap-5">
        <div className="flex flex-col md:flex-row justify-between w-full gap-5">
          <div className="flex items-center gap-2.5">
            <SealLogo size={28} color="brass" />
            <span className="text-parchment text-[13px] opacity-70">Palace Protocol Academy</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about" className="text-[13px] text-parchment opacity-80 hover:text-[#C9A860] transition-colors">About</Link>
            <Link href="/books" className="text-[13px] text-parchment opacity-80 hover:text-[#C9A860] transition-colors">Books</Link>
            <Link href="/contact" className="text-[13px] text-parchment opacity-80 hover:text-[#C9A860] transition-colors">Contact</Link>
            <Link href="/login" className="text-[13px] text-parchment opacity-80 hover:text-[#C9A860] transition-colors">Member login</Link>
            <Link href="/terms" className="text-[13px] text-parchment opacity-60 hover:text-[#C9A860] transition-colors">Terms</Link>
            <Link href="/policies" className="text-[13px] text-parchment opacity-60 hover:text-[#C9A860] transition-colors">Privacy</Link>
          </div>
        </div>
        <p className="text-[12px] text-parchment opacity-40 mt-2 font-mono tracking-wide">
          © 2026 PALACE PROTOCOL ACADEMY
        </p>
      </div>
    </footer>
  );
}
