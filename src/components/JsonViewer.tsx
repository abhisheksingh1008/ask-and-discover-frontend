import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface JsonViewerProps {
  data: any;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent collapsible from toggling
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast({
      description: "JSON copied to clipboard",
      duration: 2000,
    });
  };

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">JSON Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <div className="flex justify-between items-center w-full cursor-pointer p-3 border rounded-md">
              <div className="flex items-center space-x-2">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <span>{isOpen ? "Hide" : "Show"} JSON</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="ml-auto"
              >
                <Copy className="h-4 w-4 mr-1 text-cricket-primary" />
                Copy
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <pre className="p-4 bg-gray-50 rounded-md overflow-x-auto text-xs max-h-80 scrollbar-thin break-words whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default JsonViewer;
