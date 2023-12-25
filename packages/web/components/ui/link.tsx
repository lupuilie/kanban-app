import { LinkProps as NextLinkProps, default as NextLink } from 'next/link';

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & NextLinkProps;

export default function Link(props: LinkProps & { children?: React.ReactNode }) {
  return (
    <NextLink {...props} scroll={props.scroll ?? false}>
      {props?.children}
    </NextLink>
  );
}
