import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { PlayIcon, MailboxIcon } from "@phosphor-icons/react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">This is a title, it&apos;s big</h1>
          <p className="text-balance text-muted-foreground">
            This is a text and it&apos;s supposed to be long, so we use text-balance to make it wrap
            nicely.
          </p>
        </div>

        <div className="flex w-full items-center gap-3">
          <Button className="flex-1">
            <PlayIcon />
            <span>Primary</span>
          </Button>

          <Button className="flex-1" variant="secondary">
            <MailboxIcon />
            <span>Secondary</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
