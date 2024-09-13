import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CsrfToken } from "./csrf-token";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export function LoginForm() {
  const formId = "login-form";
  return (
    <>
      <form
        action="/api/auth/callback/credentials?callbackUrl=/dashboard"
        method="POST"
        id={formId}
        className="hidden"
      />
      <CsrfToken type="hidden" form={formId} name="csrfToken" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              form={formId}
              name="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              form={formId}
              name="password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" form={formId} type="submit">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
