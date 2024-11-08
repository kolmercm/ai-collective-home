'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, DollarSign } from 'lucide-react'

type Bet = {
  id: string
  name: string
  odds: number
}

type Event = {
  id: string
  name: string
  sport: string
  status: 'upcoming' | 'live' | 'finished'
  score: string
  timeRemaining: string
  bets: Bet[]
}

export function LiveEventsComponent() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'Lakers vs Warriors',
      sport: 'Basketball',
      status: 'live',
      score: '76 - 82',
      timeRemaining: '5:30',
      bets: [
        { id: '1a', name: 'Lakers to win', odds: 2.1 },
        { id: '1b', name: 'Warriors to win', odds: 1.8 },
      ]
    },
    {
      id: '2',
      name: 'Man City vs Liverpool',
      sport: 'Soccer',
      status: 'live',
      score: '2 - 1',
      timeRemaining: '35:00',
      bets: [
        { id: '2a', name: 'Man City to win', odds: 1.5 },
        { id: '2b', name: 'Liverpool to win', odds: 3.2 },
        { id: '2c', name: 'Draw', odds: 2.8 },
      ]
    }
  ])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setEvents(prevEvents => 
        prevEvents.map(event => ({
          ...event,
          score: updateScore(event.score),
          timeRemaining: updateTime(event.timeRemaining),
          bets: event.bets.map(bet => ({
            ...bet,
            odds: updateOdds(bet.odds)
          }))
        }))
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const updateScore = (score: string) => {
    const [score1, score2] = score.split(' - ').map(Number)
    return `${score1 + Math.floor(Math.random() * 2)} - ${score2 + Math.floor(Math.random() * 2)}`
  }

  const updateTime = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number)
    if (seconds > 0) {
      return `${minutes}:${(seconds - 5).toString().padStart(2, '0')}`
    } else if (minutes > 0) {
      return `${minutes - 1}:55`
    } else {
      return '0:00'
    }
  }

  const updateOdds = (odds: number) => {
    return +(odds + (Math.random() - 0.5) * 0.2).toFixed(2)
  }

  const [betAmount, setBetAmount] = useState<string>('')

  const placeBet = (eventId: string, betId: string) => {
    console.log(`Placed bet of $${betAmount} on event ${eventId}, bet ${betId}`)
    setBetAmount('')
    // Here you would typically send this bet to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Live Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map(event => (
          <Card key={event.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {event.name}
                <Badge variant={event.status === 'live' ? 'destructive' : 'secondary'}>
                  {event.status.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription>{event.sport}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold">{event.score}</span>
                <span className="flex items-center">
                  <Clock className="mr-1" size={16} />
                  {event.timeRemaining}
                </span>
              </div>
              <div className="space-y-2">
                {event.bets.map(bet => (
                  <div key={bet.id} className="flex justify-between items-center">
                    <span>{bet.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{bet.odds}</Badge>
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        className="w-20"
                      />
                      <Button size="sm" onClick={() => placeBet(event.id, bet.id)}>
                        <DollarSign className="mr-1" size={16} />
                        Bet
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Odds update in real-time. Bet responsibly.</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}