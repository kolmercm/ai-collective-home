'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SportsBettingFaq() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">Welcome to Our Sports Betting Platform</CardTitle>
          <CardDescription>Your go-to destination for exciting sports action and potential winnings!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our platform offers a wide range of sports and events to bet on, competitive odds, and a user-friendly
            interface. Whether you're a seasoned bettor or new to the game, we've got you covered with comprehensive
            guides, real-time updates, and responsive customer support. Join us today and elevate your sports
            experience!
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is sports betting?</AccordionTrigger>
          <AccordionContent>
            Sports betting is the activity of predicting sports results and placing a wager on the outcome. It can
            involve various sports and events, from football and basketball to horse racing and esports.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I place a bet?</AccordionTrigger>
          <AccordionContent>
            To place a bet, first create an account and deposit funds. Then, navigate to your desired sport and event,
            select your preferred bet type, enter your stake, and confirm your bet. Always review your bet slip before
            finalizing.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What types of bets can I make?</AccordionTrigger>
          <AccordionContent>
            Common bet types include moneyline (picking a winner), point spread (betting on the margin of victory),
            over/under (betting on the total score), parlays (combining multiple bets), and prop bets (specific
            outcomes within a game).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>How do odds work?</AccordionTrigger>
          <AccordionContent>
            Odds represent the likelihood of an outcome and determine your potential payout. They can be displayed in
            different formats: American (e.g., +200), Decimal (3.00), or Fractional (2/1). Higher odds indicate a less
            likely outcome but a larger potential payout.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Is sports betting legal?</AccordionTrigger>
          <AccordionContent>
            The legality of sports betting varies by country and jurisdiction. In the United States, it's legal in many
            states but regulated differently. Always check your local laws and regulations before participating in
            sports betting.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>How do I withdraw my winnings?</AccordionTrigger>
          <AccordionContent>
            To withdraw winnings, go to your account dashboard and select the withdrawal option. Choose your preferred
            method (e.g., bank transfer, e-wallet) and follow the prompts. Processing times may vary depending on the
            method chosen.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>What is responsible gambling?</AccordionTrigger>
          <AccordionContent>
            Responsible gambling means enjoying betting as entertainment, not as a source of income. Set limits on time
            and money spent, never chase losses, and seek help if betting negatively impacts your life. Our platform
            offers tools to help you gamble responsibly.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}