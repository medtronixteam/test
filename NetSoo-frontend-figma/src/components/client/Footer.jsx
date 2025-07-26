import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialLinks1 = [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Threads", href: "#" },
    { name: "Twitter / X", href: "#" },
    { name: "Bluesky", href: "#" },
  ];

  const socialLinks2 = [
    { name: "LinkedIn", href: "#" },
    { name: "Google", href: "#" },
    { name: "Pinterest", href: "#" },
    { name: "Tiktok", href: "#" },
    { name: "YouTube", href: "#" },
  ];

  const serviceLinks = [
    { name: "Meta Ads", href: "#" },
    { name: "Google Ads", href: "#" },
    { name: "Twitch", href: "#" },
    { name: "Looker Studio", href: "#", isNew: true },
  ];

  const aboutLinks = [
    { name: "About Us", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Partners", href: "/partners" },
  ];

  return (
    <footer className="relative text-white">
      <div className="absolute inset-0 w-full min-h-[370px]">
        <Image
          src="/client/footerBg.svg"
          alt="Footer Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_3fr_1fr] gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/images/logo.svg"
              alt="NetSoo Logo"
              width={70}
              height={40}
              className="mb-6"
            />
            <p className="text-sm leading-relaxed text-[#FFFFFFB2] max-w-xs text-center md:text-left">
              NetSoo helps you plan content, analyze performance, and grow
              faster — all with AI-powered tools designed for creators, brands,
              and agencies.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FFFFFFB2] hover:opacity-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4 text-lg">Socials</h3>
            <div className="grid grid-cols-3 gap-x-4">
              <ul className="space-y-3">
                {socialLinks1.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#FFFFFFB2] hover:opacity-100 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div>
                <ul className="space-y-3">
                  {socialLinks2.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#FFFFFFB2] hover:opacity-100 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="space-y-3 ">
                  {serviceLinks.map((link) => (
                    <li key={link.name} className="flex items-center">
                      <Link
                        href={link.href}
                        className="text-sm text-[#FFFFFFB2] hover:opacity-100 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                      {link.isNew && (
                        <span className="ml-2 bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-[20px]">
                          New
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4 text-lg">About</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FFFFFFB2] hover:opacity-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 py-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#FFFFFFB2] mb-4 md:mb-0">
            Copyright 2025. All Rights Reserved
          </p>
          <div className="flex items-center space-x-3">
            <Link
              href="/imprint"
              className="text-sm text-[#FFFFFFB2] hover:opacity-100 transition-opacity"
            >
              Imprint
            </Link>
            <span className="text-[#FFFFFFB2]">•</span>
            <Link
              href="/privacy"
              className="text-sm text-[#FFFFFFB2] hover:opacity-100 transition-opacity"
            >
              Privacy policy
            </Link>
            <span className="text-[#FFFFFFB2]">•</span>
            <Link
              href="/terms"
              className="text-sm text-[#FFFFFFB2] hover:opacity-100 transition-opacity"
            >
              Terms & conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
