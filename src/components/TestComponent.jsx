import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestComponent() {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Test Component</CardTitle>
          <CardDescription>This is a test to verify shadcn UI components are working</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </div>
  );
}