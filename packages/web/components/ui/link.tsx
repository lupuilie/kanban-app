import { LinkProps, default as NextLink } from 'next/link';

export default function Link(props: LinkProps & { children: React.ReactNode }) {
  return (
    <NextLink {...props} scroll={props.scroll ?? false}>
      {props.children}
    </NextLink>
  );
}
