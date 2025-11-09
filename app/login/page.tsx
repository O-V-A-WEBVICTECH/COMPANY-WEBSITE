"use client";
import { FormEvent, JSX, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { Loader2, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Link from "next/link";

export default function Login(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  // Handle email/password login
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Invalid credentials");
        return;
      }

      toast.success("Login successful! Redirecting...");
      // Optional: redirect handled by authClient callbackURL
    } catch (error) {
      console.error("Login error:", error);
      // toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  // Handle Google Sign-In
  async function handleGoogleSignIn() {
    try {
      setGoogleLoading(true);
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Google sign-in failed");
        return;
      }

      // Redirect is handled by auth provider
    } catch (error: unknown) {
      console.error("Google sign-in error:", error);
      // toast.error(error || "Failed to sign in with Google");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <main className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                disabled={loading || googleLoading}
                className="h-11"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                disabled={loading || googleLoading}
                className="h-11"
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full cursor-pointer h-11 font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
              disabled={loading || googleLoading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in with Email"
              )}
            </Button>
          </form>

          <div className="relative">
            <Separator className="bg-gray-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                or
              </span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full cursor-pointer flex items-center justify-center gap-3 font-medium"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            asChild
          >
            <div className="flex items-center">
              <FcGoogle size={26} />
              <p>Continue with Google</p>
            </div>
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Don&apos;t have an account?{" "}
            </span>
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
