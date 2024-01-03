type BoardLayoutProps = {
  dialog: React.ReactNode;
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function Layout({ children, dialog }: BoardLayoutProps) {
  return (
    <>
      {children}
      {dialog}
    </>
  );
}
