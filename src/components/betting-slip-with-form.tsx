"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { v4 as uuidv4 } from 'uuid'
import { Cross2Icon } from "@radix-ui/react-icons"

interface BetPick {
  id: string
  event: string
  selection: string
  odds: number
}

export function BettingSlipWithForm({ initialPicks = [] }: { initialPicks?: BetPick[] }) {
  const [picks, setPicks] = useState<BetPick[]>(initialPicks)
  const [newPick, setNewPick] = useState<Omit<BetPick, 'id'>>({
    event: '',
    selection: '',
    odds: 1.0
  })

  const removePick = (id: string) => {
    setPicks(picks.filter(pick => pick.id !== id))
  }

  const addPick = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPick.event && newPick.selection && newPick.odds > 1) {
      setPicks([...picks, { ...newPick, id: uuidv4() }])
      setNewPick({ event: '', selection: '', odds: 1.0 })
    }
  }

  const calculateTotalOdds = () => {
    return picks.reduce((total, pick) => total * pick.odds, 1).toFixed(2)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Betting Slip</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addPick} className="mb-4 space-y-4">
          <div>
            <Label htmlFor="event">Event</Label>
            <Input
              id="event"
              value={newPick.event}
              onChange={(e) => setNewPick({ ...newPick, event: e.target.value })}
              placeholder="e.g. Man City vs Chelsea"
            />
          </div>
          <div>
            <Label htmlFor="selection">Selection</Label>
            <Input
              id="selection"
              value={newPick.selection}
              onChange={(e) => setNewPick({ ...newPick, selection: e.target.value })}
              placeholder="e.g. Man City to win"
            />
          </div>
          <div>
            <Label htmlFor="odds">Odds</Label>
            <Input
              id="odds"
              type="number"
              step="0.01"
              min="1.01"
              value={newPick.odds}
              onChange={(e) => setNewPick({ ...newPick, odds: parseFloat(e.target.value) })}
            />
          </div>
          <Button type="submit" className="w-full">Add Pick</Button>
        </form>
        <ScrollArea className="h-[300px] pr-4">
          {picks.length === 0 ? (
            <p className="text-center text-muted-foreground">No picks added yet.</p>
          ) : (
            picks.map((pick) => (
              <div key={pick.id} className="mb-4 flex items-center justify-between rounded-lg border p-3">
                <div>
                  <h3 className="font-semibold">{pick.event}</h3>
                  <p className="text-sm text-muted-foreground">{pick.selection}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold">{pick.odds.toFixed(2)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePick(pick.id)}
                    aria-label={`Remove ${pick.selection} from betting slip`}
                  >
                    <Cross2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-semibold">Total Odds:</span>
          <span className="font-mono text-lg font-bold">{calculateTotalOdds()}</span>
        </div>
        <Button className="w-full" disabled={picks.length === 0}>
          Place Bet
        </Button>
      </CardFooter>
    </Card>
  )
}