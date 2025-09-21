import { JSX } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { handleLogin } from "./actions";

export default function Login(): JSX.Element {
  return (
    <main className="w-screen min-h-screen flex items-center justify-center bg-green-300">
      <Card>
        <CardHeader className="text-center my-3">Welcome Back</CardHeader>
        <CardContent>
          <form className="lg:w-[500px]" action={handleLogin}>
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
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
