
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Cricket Data Explorer</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Analyze cricket statistics and compare player performances with our comprehensive tools
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Query Explorer Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle>Cricket Query Explorer</CardTitle>
            <CardDescription>
              Ask questions about cricket statistics and get instant insights
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">
              Search for any cricket statistic or record. Get detailed tables, visualizations and stories about the data.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
              <li>Natural language queries</li>
              <li>Detailed statistical tables</li>
              <li>Data visualizations</li>
              <li>Historical context</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-end bg-primary/5 border-t">
            <Button asChild>
              <Link to="/" className="flex items-center">
                Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Player Comparison Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle>Player Comparison Tool</CardTitle>
            <CardDescription>
              Compare statistics between any two cricket players
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">
              Select players from different teams and analyze their performance metrics side by side with interactive visualizations.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
              <li>Batting and bowling statistics</li>
              <li>Performance radar charts</li>
              <li>Innings-specific filtering</li>
              <li>Head-to-head analysis</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-end bg-primary/5 border-t">
            <Button asChild>
              <Link to="/player-comparison" className="flex items-center">
                Compare Players <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
