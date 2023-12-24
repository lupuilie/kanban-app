import { Button } from '@/components/ui/button';
import { ThemeSwitch } from '@/components/theme-switch';

export default function Home() {
  return (
    <main>
      <Button className="mr-4">Click me</Button>
      <ThemeSwitch />
    </main>
  );
}
