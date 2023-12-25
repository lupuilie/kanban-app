type BoardLayoutProps = {
  dialog: React.ReactNode;
  children: React.ReactNode;
};

export default async function Layout(props: BoardLayoutProps) {
  return (
    <>
      <header>Header</header>
      {props.children}
      <footer>Footer</footer>
      {props.dialog}
    </>
  );
}
