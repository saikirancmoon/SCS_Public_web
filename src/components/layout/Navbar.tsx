"use client";

import { useEffect, useState, type FocusEvent, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const logo = "/assets/logo_transparent_fixed.png";

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "Founder", href: "/about-us/founder" },
      { label: "Chairperson", href: "/about-us/chairperson" },
      { label: "Leadership Team", href: "/about-us/leadership-team" },
    ],
  },
  {
    label: "Academics",
    href: "/academics/pre-primary",
    children: [
      { label: "Pre-Primary", href: "/academics/pre-primary" },
      { label: "Primary", href: "/academics/primary" },
      { label: "High School", href: "/academics/high-school" },
    ],
  },
  {
    label: "Student Life",
    href: "/student-life",
    children: [
      { label: "Facilities", href: "/student-life/facilities" },
      { label: "Uniforms", href: "/student-life/uniforms" },
      { label: "Gallery", href: "/student-life/gallery" },
    ],
  },
    { label: "Achievements", href: "/achievements" },
  {
    label: "Careers",
    href: "/careers",
    children: [
      { label: "Current Openings", href: "/careers/current-openings" },
      { label: "Apply Jobs", href: "/careers/apply" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    children: [{ label: "Enquire", href: "/contact/enquire" }],
  },
];

const leftLinks = navLinks.slice(0, 3);
const rightLinks = navLinks.slice(3);

const Logo = ({
  compact = false,
  hideText = false,
  isScrolled = false,
}: {
  compact?: boolean;
  hideText?: boolean;
  isScrolled?: boolean;
}) => {
  const shouldHideText = hideText || compact;
  return (
  <Link
    href="/"
    className={`group relative z-0 flex flex-col items-center justify-center transition-transform duration-300 ${
      compact ? "translate-y-0" : "translate-y-3"
    }`}
  >
    <div
      className={`relative z-10 rounded-full bg-white shadow-[0_18px_30px_rgba(13,59,102,0.2)] flex items-center justify-center transition-transform duration-300  ${
        compact ? "w-[58px] h-[58px]" : "w-14 h-14"
      } ${isScrolled ? (compact ? "scale-105" : "scale-[1.2]") : "scale-100"}`}
    >
      <img
        src={logo}
        alt="Sri Chaitanya logo"
        className={`${compact ? "w-[58px] h-[58px]" : "w-18 h-18"} object-contain`}
      />
    </div>
    <div
      className={`pointer-events-none absolute left-1/2 z-0 ${
        compact ? "top-[54px] h-24 w-36" : "top-[35px] h-24 w-[420px]"
      } -translate-x-1/2 rounded-b-[55%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0)_75%)] blur-2xl mix-blend-screen transition-opacity duration-300 ${
        shouldHideText ? "opacity-0" : "opacity-60"
      }`}
    />
    <div
      className={`pointer-events-none absolute left-1/2 z-0 ${
        compact ? "top-[58px] h-10 w-10" : "top-[68px] h-12 w-12"
      } -translate-x-1/2 rounded-full bg-white/20 blur-lg transition-opacity duration-300 ${
        shouldHideText ? "opacity-0" : "opacity-55"
      }`}
    />
    <div
      className={`relative z-10 flex flex-col items-center transition-all duration-300 ${
        shouldHideText
          ? "opacity-0 translate-y-2 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
    >
      <span
        className={`mt-2 font-['Cinzel_Decorative'] font-bold text-[hsl(var(--primary))] ${
          compact ? "text-lg" : "text-3xl"
        }`}
      >
        Sri Chaitanya
      </span>
      <span
        className={`font-sans font-semibold tracking-[0.45em] text-[hsl(var(--accent))] ${
          compact ? "text-[10px]" : "text-sm"
        }`}
      >
        SCHOOLS
      </span>
    </div>
  </Link>
  );
};

const Navbar = () => {
  const [location, setLocation] = useState("Select City");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginView, setLoginView] = useState<"login" | "reset">("login");
  const [loginRole, setLoginRole] = useState<"parent" | "teacher">("parent");
  const [loginIdentifier, setLoginIdentifier] = useState("SCS");
  const pathname = usePathname();

  const normalizeParentIdentifier = (value: string) => {
    if (!value) {
      return "SCS";
    }

    if ("SCS".startsWith(value.toUpperCase())) {
      return "SCS";
    }

    const suffix = value.toUpperCase().startsWith("SCS")
      ? value.slice(3)
      : value.replace(/^(SCS|SC|S)/i, "");

    return `SCS${suffix}`;
  };

  const handleLoginRoleChange = (value: string) => {
    const nextRole = value as "parent" | "teacher";
    setLoginRole(nextRole);
    setLoginIdentifier(nextRole === "parent" ? "SCS" : "");
  };

  const handleSelectCityClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById("location-selector");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.location.assign("/#location-selector");
    }
  };

  const handleLoginClick = () => {
    setLoginView("login");
    setIsLoginOpen(true);
    setIsOpen(false);
  };

  const handleForgotClick = () => {
    setLoginView("reset");
    setIsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {

  const updateLocation = () => {
    const loc = localStorage.getItem("scs-location");
    if (loc) {
      setLocation(loc);
    }
  };

  // load when navbar first loads
  updateLocation();

  // listen for hero section update
  window.addEventListener("locationChange", updateLocation);

  return () => window.removeEventListener("locationChange", updateLocation);

}, []);

  const renderDesktopLink = (link: NavLink, align: "left" | "right" = "left") => {
    if (!link.children?.length) {
      return (
        <Link
          key={link.label}
          href={link.href}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-200"
        >
          {link.label}
        </Link>
      );
    }

    const isOpen = openDropdown === link.label;

    return (
      <div
        key={link.label}
        className="relative"
        onMouseEnter={() => setOpenDropdown(link.label)}
        onMouseLeave={() => setOpenDropdown(null)}
        onFocus={() => setOpenDropdown(link.label)}
        onBlur={(event: FocusEvent<HTMLDivElement>) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setOpenDropdown(null);
          }
        }}
      >
        <Link
          href={link.href}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setOpenDropdown(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-200"
        >
          {link.label}
          <ChevronDown className="w-3 h-3 opacity-80" />
        </Link>
        <div
          className={`absolute ${align === "right" ? "right-0" : "left-0"} top-full z-50 pt-3 origin-top transition-[opacity,transform] duration-200 ease-out ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <div
            role="menu"
            className="min-w-[200px] rounded-xl bg-white text-[hsl(var(--primary))] shadow-[0_18px_40px_rgba(0,0,0,0.25)] border border-black/10 overflow-hidden"
          >
            <div className="py-2">
              {link.children.map((child) => (
                <Link
                  key={child.label}
                  role="menuitem"
                  href={child.href}
                  onClick={() => setOpenDropdown(null)}
                  className="block px-5 py-2.5 text-sm font-medium text-[hsl(var(--primary))] hover:bg-black/5 transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgb(3_42_88)] text-white shadow-[0_18px_35px_rgba(13,59,102,0.25)]">
      
      <div className="h-1 w-full bg-[linear-gradient(90deg,_hsl(var(--accent)),_hsl(var(--primary)))]" />
      <div className="container mx-auto px-6 h-[80px] relative">
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center py-3">
          <div className="flex items-center gap-6 justify-end pr-6 -translate-y-5">

  {leftLinks.map((link) => renderDesktopLink(link))}

</div>

          <Logo hideText={isScrolled} isScrolled={isScrolled} />

          <div className="flex items-center gap-6 justify-start pl-6 -translate-y-5">

  {rightLinks.map((link) => renderDesktopLink(link, "right"))}

</div>
        </div>

        <div className="relative flex lg:hidden h-full items-center">
          <button className="w-10 h-10 flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-0">
            <Logo compact hideText={isScrolled} isScrolled={isScrolled} />
          </div>
          <div className="ml-auto w-10 h-10" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white text-[hsl(var(--primary))]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.label} className="flex flex-col gap-2">
                  <Link
                    href={link.href}
                    className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 border-l border-[hsl(var(--primary)/0.15)] pl-4 flex flex-col gap-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--primary)/0.8)] hover:text-[hsl(var(--accent))] py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleLoginClick}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_12px_28px_rgba(13,59,102,0.25)] transition-colors hover:bg-[hsl(var(--accent))]"
              >
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons (desktop) */}
      <div className="hidden lg:flex items-center absolute left-16 top-[40px] -translate-y-1/2">
        <a
          href="/#location-selector"
          onClick={handleSelectCityClick}
          className="group inline-flex items-center rounded-full p-[1.5px] bg-[radial-gradient(circle_at_bottom_left,hsl(var(--accent))_0%,hsl(var(--primary))_65%)] shadow-[0_12px_28px_rgba(13,59,102,0.25)] transition-all duration-300 ease-out hover:shadow-[0_18px_35px_rgba(226,61,104,0.35)]"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            <span className="text-white">
              {location === "Select City" ? "Click to select city" : location}
            </span>
          </span>
        </a>
      </div>

      <div className="hidden lg:flex items-center gap-3 absolute right-6 top-[40px] -translate-y-1/2">
        <Link
          href="/admissions"
          className="group relative inline-flex items-center overflow-hidden rounded-full border border-[hsl(var(--accent)/0.55)] bg-[linear-gradient(135deg,#f14f82_0%,#e23d68_58%,#d93463_100%)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_14px_34px_rgba(226,61,104,0.34)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(226,61,104,0.52)] hover:brightness-110 active:translate-y-0 active:scale-[0.98]"
        >
          <span className="absolute inset-y-0 -left-12 w-10 rotate-12 bg-white/35 blur-md transition-transform duration-700 group-hover:translate-x-56" />
          <span className="relative z-10">Apply for Admission</span>
        </Link>
        <button
          type="button"
          onClick={handleLoginClick}
          className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white shadow-[0_12px_28px_rgba(13,59,102,0.25)] backdrop-blur-md transition-all duration-300 ease-out hover:bg-[hsl(var(--accent))] hover:border-[hsl(var(--accent))] hover:text-white hover:shadow-[0_18px_35px_rgba(226,61,104,0.35)] active:scale-[0.98]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[hsl(var(--accent))] shadow-[0_6px_12px_rgba(226,61,104,0.35)] transition group-hover:bg-white/25 group-hover:text-white">
            <User className="w-3.5 h-3.5" />
          </span>
          Login
        </button>
      </div>

      <Dialog
        open={isLoginOpen}
        onOpenChange={(open) => {
          setIsLoginOpen(open);
          if (open) {
            setLoginView("login");
          }
        }}
      >
        <DialogContent className="w-[min(94vw,480px)] max-w-[480px] overflow-hidden border border-white/20 bg-white p-0 shadow-[0_34px_90px_rgba(8,23,46,0.42)] sm:rounded-lg">
          <DialogTitle className="sr-only">
            {loginView === "reset" ? "Reset your password" : "Sign in"}
          </DialogTitle>
          <div className="grid">
            <div className="relative min-h-[78px] overflow-hidden bg-[linear-gradient(145deg,#071a31_0%,#0d3b66_58%,#0b2849_100%)] px-6 py-4 text-white">
              <div className="pointer-events-none absolute inset-0 opacity-70">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />
                <span className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(226,61,104,0.36),transparent_70%)] blur-2xl" />
                <span className="absolute -bottom-24 left-6 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)] blur-3xl" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-[0_16px_36px_rgba(0,0,0,0.2)]">
                    <img src={logo} alt="Sri Chaitanya logo" className="h-11 w-11 object-contain" />
                  </span>
                  <div>
                    <p className="font-['Cinzel_Decorative'] text-xl font-bold leading-none">
                      Sri Chaitanya
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.45em] text-[hsl(var(--accent))]">
                      Schools
                    </p>
                  </div>
                </div>

                <div className="mt-auto" />
              </div>
            </div>

            <div
              className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 sm:p-5"
              style={{ perspective: "1200px" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {loginView === "login" ? (
                  <motion.form
                    key="login-form"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3"
                    style={{ transformOrigin: "center top", transformStyle: "preserve-3d" }}
                    onSubmit={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <div className="space-y-3">
                      <Label className="text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--primary)/0.7)]">
                        Login as
                      </Label>
                      <RadioGroup
                        value={loginRole}
                        onValueChange={handleLoginRoleChange}
                        className="grid grid-cols-2 gap-3"
                      >
                        {[
                          { value: "parent", label: "Parent", helper: "Student access" },
                          { value: "teacher", label: "Teacher", helper: "Staff access" },
                        ].map((role) => (
                          <Label
                            key={role.value}
                            htmlFor={`login-role-${role.value}`}
                            className={`cursor-pointer rounded-lg border p-4 shadow-sm transition ${
                              loginRole === role.value
                                ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.08)] text-[hsl(var(--primary))] shadow-[0_12px_28px_rgba(226,61,104,0.12)]"
                                : "border-slate-200 bg-white text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.3)]"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <RadioGroupItem id={`login-role-${role.value}`} value={role.value} />
                              <span>
                                <span className="block text-sm font-semibold">{role.label}</span>
                                <span className="mt-1 block text-xs text-[hsl(var(--primary)/0.55)]">
                                  {role.helper}
                                </span>
                              </span>
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-identifier" className="text-sm font-semibold text-[hsl(var(--primary))]">
                          {loginRole === "teacher" ? "Employee ID" : "Admission No."}
                        </Label>
                        <Input
                          id="login-identifier"
                          type="text"
                          placeholder={loginRole === "teacher" ? "Enter employee ID" : "Enter admission number"}
                          autoComplete="username"
                          value={loginIdentifier}
                          onChange={(event) => {
                            setLoginIdentifier(
                              loginRole === "parent"
                                ? normalizeParentIdentifier(event.target.value)
                                : event.target.value,
                            );
                          }}
                          onKeyDown={(event) => {
                            if (
                              loginRole === "parent" &&
                              (event.key === "Backspace" || event.key === "Delete") &&
                              event.currentTarget.selectionStart !== null &&
                              event.currentTarget.selectionStart <= 3 &&
                              event.currentTarget.selectionEnd !== null &&
                              event.currentTarget.selectionEnd <= 3
                            ) {
                              event.preventDefault();
                            }
                          }}
                          className="h-11 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-[hsl(var(--accent))]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-sm font-semibold text-[hsl(var(--primary))]">
                          Password
                        </Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter password"
                          autoComplete="current-password"
                          className="h-11 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-[hsl(var(--accent))]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <Label
                        htmlFor="remember-me"
                        className="flex cursor-pointer items-center gap-2 text-sm text-[hsl(var(--primary)/0.65)]"
                      >
                        <Checkbox id="remember-me" />
                        Remember me
                      </Label>
                      <button
                        type="button"
                        onClick={handleForgotClick}
                        className="font-semibold text-[hsl(var(--primary))] underline-offset-4 transition hover:text-[hsl(var(--accent))] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="h-12 w-full rounded-lg bg-[linear-gradient(135deg,#e23d68_0%,#d6315f_100%)] text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_16px_34px_rgba(226,61,104,0.28)] transition hover:brightness-105"
                    >
                      Sign in
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="reset-form"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-4"
                    style={{ transformOrigin: "center top", transformStyle: "preserve-3d" }}
                  >
                    <div>
                      <h2 className="font-['Fraunces'] text-2xl font-semibold text-[hsl(var(--primary))]">
                        Reset your password
                      </h2>
                      <p className="mt-1 text-sm text-[hsl(var(--primary)/0.62)]">
                        Enter your registered email or mobile number.
                      </p>
                    </div>

                    <form
                      className="space-y-4"
                      onSubmit={(event) => {
                        event.preventDefault();
                      }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="forgot-identifier" className="text-sm font-semibold text-[hsl(var(--primary))]">
                          Email or Mobile
                        </Label>
                        <Input
                          id="forgot-identifier"
                          type="text"
                          placeholder="name@example.com"
                          autoComplete="username"
                          className="h-11 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-[hsl(var(--accent))]"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="h-12 w-full rounded-lg bg-[linear-gradient(135deg,#e23d68_0%,#d6315f_100%)] text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_16px_34px_rgba(226,61,104,0.28)] transition hover:brightness-105"
                      >
                        Send reset link
                      </Button>
                    </form>

                    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span>We will never share your details.</span>
                      <button
                        type="button"
                        onClick={() => setLoginView("login")}
                        className="font-medium text-[hsl(var(--primary))] hover:underline"
                      >
                        Back to login
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
