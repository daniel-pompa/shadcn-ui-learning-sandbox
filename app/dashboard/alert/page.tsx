import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, LaptopMinimalCheck, Terminal, TriangleAlert } from 'lucide-react';

export default function AlertDemo() {
  return (
    <div className='grid gap-3'>
      <Alert>
        <Terminal />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the CLI.
        </AlertDescription>
      </Alert>

      <Alert variant='success'>
        <LaptopMinimalCheck />
        <AlertTitle>Component installed</AlertTitle>
        <AlertDescription>
          Alert component successfully added and ready to use in your app.
        </AlertDescription>
      </Alert>

      <Alert variant='info'>
        <Info />
        <AlertTitle>CLI commands</AlertTitle>
        <AlertDescription>
          Run `npx shadcn-ui@latest add [component]` to add more UI components.
        </AlertDescription>
      </Alert>

      <Alert variant='warning'>
        <TriangleAlert />
        <AlertTitle>Dependency check</AlertTitle>
        <AlertDescription>
          Some components may require additional dependencies via npm or yarn.
        </AlertDescription>
      </Alert>

      <Alert variant='destructive'>
        <Terminal />
        <AlertTitle>Installation error</AlertTitle>
        <AlertDescription>
          Failed to add component. Check network connection and try the CLI command again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
