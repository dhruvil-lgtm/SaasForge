"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 pt-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
        <Link
          href="/"
          className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3"
        >
          <svg viewBox="0 0 256 256" className="h-5 w-5 fill-white shrink-0">
            <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
          </svg>
          <span className="text-white text-sm font-normal tracking-tight">
            saasforge
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full"
            >
              {link.label.toLowerCase()}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-2 pr-4 py-2 text-white text-sm hover:bg-neutral-800 transition-colors">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-xs bg-white/10 text-white">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800 text-white">
                <DropdownMenuItem asChild className="focus:bg-neutral-800 focus:text-white">
                  <Link href="/dashboard" className="flex items-center gap-2 text-white">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neutral-800" />
                <DropdownMenuItem asChild className="focus:bg-neutral-800 focus:text-white">
                  <Link href="/logout" className="flex items-center gap-2 text-red-400">
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <button className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2">
                  log in
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors">
                  get started
                </button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden bg-neutral-900/90 backdrop-blur rounded-full p-3"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-3 mx-6 md:mx-10 bg-neutral-900/95 backdrop-blur rounded-2xl px-6 py-5 space-y-3 pointer-events-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-neutral-300 hover:text-white py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label.toLowerCase()}
            </Link>
          ))}
          <div className="pt-3 space-y-2 border-t border-neutral-800">
            <Link href="/login" className="block">
              <button className="w-full text-sm text-neutral-300 hover:text-white py-2 text-center">
                log in
              </button>
            </Link>
            <Link href="/signup" className="block">
              <button className="w-full text-sm bg-white text-black rounded-full py-3 font-normal hover:bg-neutral-200 transition-colors">
                get started
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
