import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <CardTitle>404 - Page Not Found</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="w-full">
            <Link href="/">
              Return to Todo App
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
