import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Clock, ArrowRight, Home } from "lucide-react";

interface QuoteResultProps {
  report?: {
    estimate_id: string;
    email?: string;
    estimatedTime?: string;
  };
}

export default function QuoteResult({ report }: QuoteResultProps) {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-xl lg:text-3xl font-bold text-gray-900 mb-2">
          Estimate Sent Successfully!
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Your project quote request has been received
        </p>
      </div>

      {/* Estimate ID Card */}
      {report?.estimate_id && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm lg:text-lg">
              Your Estimate ID
            </CardTitle>
            <CardDescription>Save this for future reference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <code className="text-lg font-mono font-semibold text-blue-700">
                {report.estimate_id}
              </code>
              <Badge variant="secondary">Ref ID</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* What Happens Next */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sm lg:text-base" />
            What Happens Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm lg:text-base">
                Email Confirmation
              </h3>
              <p className="text-sm text-muted-foreground">
                You&apos;ll receive a confirmation email with your estimate
                details within the next few minutes.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm lg:text-base">
                Review & Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Our team will review your requirements and prepare a detailed
                proposal.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm lg:text-base">
                Personal Contact
              </h3>
              <p className=" text-muted-foreground text-sm">
                We&apos;ll reach out within 24-48 hours to discuss your project
                in detail.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Notice */}
      <Alert className="mb-6">
        <Mail className="h-4 w-4" />
        <AlertDescription>
          <strong>Check your email!</strong> We&apos;ve sent a copy of your
          estimate to{" "}
          <span className="font-semibold">
            {report?.email || "your registered email"}
          </span>
          . Don&apos;t forget to check your spam folder if you don&apos;t see
          it.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="default"
          size="lg"
          onClick={() => (window.location.href = "/")}
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => (window.location.href = "/contact")}
        >
          Contact Us
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Questions? Feel free to reach out to us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-600 hover:underline"
          >
            support@example.com
          </a>
        </p>
      </div>
    </div>
  );
}
