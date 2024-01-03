type BoardLayoutProps = {
  dialog: React.ReactNode;
  children: React.ReactNode;
};

export default async function Layout(props: BoardLayoutProps) {
  return (
    <>
      {props.children}
      {props.dialog}
    </>
  );
}
