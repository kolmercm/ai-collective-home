'use client'

import * as React from "react"
import { Menu, TrendingUp } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Cross2Icon } from "@radix-ui/react-icons"

// Mock data for sports and trending events
const sports = [
  { name: "Football", href: "#football" },
  { name: "Basketball", href: "#basketball" },
  { name: "Tennis", href: "#tennis" },
  { name: "Baseball", href: "#baseball" },
  { name: "Hockey", href: "#hockey" },
]

const trendingEvents = [
  { name: "UEFA Champions League Final", sport: "Football", odds: "2.5" },
  { name: "NBA Playoffs Game 7", sport: "Basketball", odds: "1.8" },
  { name: "Wimbledon Men's Final", sport: "Tennis", odds: "3.0" },
  { name: "World Series Game 1", sport: "Baseball", odds: "2.2" },
  { name: "Stanley Cup Finals", sport: "Hockey", odds: "2.7" },
]

export function BettingAppLayoutComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <div className="flex h-screen flex-col">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
  <div className="flex items-center space-x-4 overflow-x-auto">
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={() => setIsSidebarOpen(true)}
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Open sidebar</span>
    </Button>
    <Link href="/" className="text-xl font-bold whitespace-nowrap">
      BetSmart
    </Link>
    <div className="hidden md:flex space-x-4">
      {sports.map((sport) => (
        <Link
          key={sport.name}
          href={sport.href}
          className="hover:text-gray-300 whitespace-nowrap"
        >
          {sport.name}
        </Link>
      ))}
    </div>
  </div>
  <Button variant="outline" size="sm" className="whitespace-nowrap">
    Sign In
  </Button>
</nav>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        <aside className="hidden w-64 overflow-y-auto bg-gray-100 p-4 md:block">
          <h2 className="mb-4 text-lg font-semibold">Trending Events</h2>
          <ul className="space-y-2">
            {trendingEvents.map((event) => (
              <li key={event.name} className="rounded-lg bg-white p-3 shadow">
                <h3 className="font-medium">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.sport}</p>
                <p className="text-sm font-semibold text-green-600">
                  Odds: {event.odds}
                </p>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Trending Events</SheetTitle>
            </SheetHeader>
            <ul className="mt-4 space-y-2">
              {trendingEvents.map((event) => (
                <li key={event.name} className="rounded-lg bg-gray-100 p-3">
                  <h3 className="font-medium">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.sport}</p>
                  <p className="text-sm font-semibold text-green-600">
                    Odds: {event.odds}
                  </p>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <h1 className="mb-4 text-2xl font-bold">Welcome to BetSmart</h1>
          <p>Select a sport from the navigation bar or check out our trending events!</p>
        </main>
      </div>
    </div>
  )
}