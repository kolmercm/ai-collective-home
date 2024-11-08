'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRightIcon } from "@radix-ui/react-icons"

// Mock data for the events and odds
const events = [
  {
    id: 1,
    sport: "Football",
    league: "Premier League",
    teams: ["Manchester United", "Liverpool"],
    date: "2023-12-17T15:00:00Z",
    odds: {
      "1": 2.80,
      "X": 3.40,
      "2": 2.50,
      "Over 2.5": 1.95,
      "Under 2.5": 1.85
    }
  },
  {
    id: 2,
    sport: "Basketball",
    league: "NBA",
    teams: ["LA Lakers", "Golden State Warriors"],
    date: "2023-12-18T00:30:00Z",
    odds: {
      "1": 1.90,
      "2": 1.90,
      "Over 220.5": 1.85,
      "Under 220.5": 1.95
    }
  },
  {
    id: 3,
    sport: "Tennis",
    league: "Wimbledon",
    teams: ["Novak Djokovic", "Rafael Nadal"],
    date: "2023-07-10T13:00:00Z",
    odds: {
      "1": 1.75,
      "2": 2.10
    }
  }
]

export function BettingOddsOverviewComponent() {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <h1 className="text-2xl font-bold mb-4">Current Betting Odds</h1>
      {events.map((event) => (
        <Card key={event.id} className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">
              {event.sport} - {event.league}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(event.date).toLocaleString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">{event.teams.join(" vs ")}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {Object.entries(event.odds).map(([bet, odd]) => (
                  <Button
                    key={bet}
                    variant="outline"
                    className="w-full justify-between"
                    aria-label={`Select ${bet} with odds ${odd}`}
                  >
                    <span>{bet}</span>
                    <span className="font-bold">{odd.toFixed(2)}</span>
                  </Button>
                ))}
              </div>
              <Button className="w-full mt-2 sm:w-auto sm:self-end" aria-label={`View more options for ${event.teams.join(" vs ")}`}>
                More Options <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  )
}