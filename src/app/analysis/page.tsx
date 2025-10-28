'use client';

import { useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Label } from '@/components/ui/label';

const chartConfig = {
  frequency: {
    label: 'Frequency',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function AnalysisPage() {
  const [text, setText] = useState('');

  const frequencyData = useMemo(() => {
    const frequencies: { [key: string]: number } = {};
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (const letter of alphabet) {
      frequencies[letter] = 0;
    }

    for (const char of text.toUpperCase()) {
      if (alphabet.includes(char)) {
        frequencies[char]++;
      }
    }
    return Object.entries(frequencies).map(([name, value]) => ({ name, frequency: value }));
  }, [text]);

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            Frequency Analysis
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Visualize the letter frequency of any ciphertext to understand the weaknesses of classical ciphers.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Tool</CardTitle>
            <CardDescription>
              Paste your ciphertext below to see a live analysis of its letter frequency.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ciphertext">Ciphertext</Label>
              <Textarea
                id="ciphertext"
                placeholder="Paste ciphertext here..."
                className="min-h-[150px] font-code"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
                <Label>Letter Frequency Chart</Label>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={frequencyData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                allowDecimals={false}
                             />
                             <Tooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="frequency" fill="var(--color-frequency)" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/20 border-accent">
            <CardHeader>
                <CardTitle>Why This Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>
                    The Vigenère cipher was considered unbreakable for centuries, earning it the nickname <strong className="text-foreground">le chiffrage indéchiffrable</strong> ("the indecipherable cipher"). Its strength comes from using a keyword to shift letters, creating multiple cipher alphabets.
                </p>
                <p>
                    However, it has a critical weakness: the repeating nature of the key. If a key is short, patterns emerge in the ciphertext. This bar chart visualizes letter frequency. In a perfectly secure cipher, every letter would appear with roughly equal frequency, resulting in a "flat" chart.
                </p>
                <p>
                    With Vigenère, you'll notice peaks and valleys similar to natural language, just distributed differently. This non-flat distribution is the foothold cryptanalysts like Charles Babbage and Friedrich Kasiski used to break it. By finding repeated sequences in the ciphertext, they could deduce the key's length and then perform frequency analysis on each alphabet separately, effectively reducing the problem to breaking multiple simple Caesar ciphers.
                </p>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
