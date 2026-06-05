"use client";
import { FormEvent, JSX, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const router = useRouter();

  // Handle email/password registration
  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Basic validation
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Account created successfully! Redirecting...");

      return router.push("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      //   toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  // Handle Google Sign-Up
  async function handleGoogleSignUp() {
    try {
      setGoogleLoading(true);
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Google sign-up failed");
        return;
      }
      // Redirect handled by auth provider
    } catch (err) {
      console.error("Google sign-up error:", err);
      //   toast.error(err.message || "Failed to sign up with Google");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <main className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="space-y-2 text-center pb-8 pt-10">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <p className="text-sm text-gray-500">
            Get started with your free account
          </p>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-10">
          {/* Google Sign-Up Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full h-12 flex cursor-pointer items-center justify-center gap-3 font-medium border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FcGoogle size={26} />
            )}
            Continue with Google
          </Button>

          <div className="relative">
            <Separator className="bg-gray-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                or
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <User className="w-4 h-4 text-gray-600" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                disabled={loading || googleLoading}
                className="h-12 text-base placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Mail className="w-4 h-4 text-gray-600" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                disabled={loading || googleLoading}
                className="h-12 text-base placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Lock className="w-4 h-4 text-gray-600" />
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                disabled={loading || googleLoading}
                className="h-12 text-base placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoComplete="new-password"
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 cursor font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg"
              disabled={loading || googleLoading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Login CTA */}
          <div className="pt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Already have an account?
            </p>

            <Link href="/login">
              <span className="flex cursor-pointer items-center justify-center gap-2">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
                </svg>
                Sign In Instead
              </span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
