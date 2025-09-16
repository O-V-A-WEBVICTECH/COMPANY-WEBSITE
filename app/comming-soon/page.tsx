"use client";

import { ArrowLeft, Clock, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface FeatureComingSoonProps {
  featureName?: string;
  description?: string;
  backUrl?: string;
  backLabel?: string;
}

export default function FeatureComingSoon({
  featureName = "This Feature",
  description = "We're working hard to bring you something amazing. This feature is currently under development and will be available soon.",
  backUrl = "/",
  backLabel = "Back to Home",
}: FeatureComingSoonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(backUrl);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-foreground">
              {featureName} Coming Soon
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Back Button */}
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
