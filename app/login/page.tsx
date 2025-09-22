"use client";
import { FormEvent, JSX, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function Login(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  //this function handles login
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      setLoading(true);
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });
      if (!error) console.log("data:", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-screen min-h-screen flex items-center justify-center">
      <Card>
        <CardHeader className="text-center my-3">Welcome Back</CardHeader>
        <CardContent>
          <form className="lg:w-[500px]" onSubmit={handleLogin}>
            <div className="flex gap-2 mb-3 flex-col">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                required
                id="email"
                placeholder="example@yahoo.com"
              />
            </div>
            <div className="flex gap-2 mb-3 flex-col">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="*********"
                name="password"
                id="password"
                required
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer"
            >
              Login
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
