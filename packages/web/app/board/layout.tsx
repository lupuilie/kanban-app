type BoardLayoutProps = {
  dialog: React.ReactNode;
  children: React.ReactNode;
  dashboard: React.ReactNode;
};

export default async function Layout(props: BoardLayoutProps) {
  return (
    <>
      {props.dashboard}
      {props.children}
      {props.dialog}
    </>
  );
}
