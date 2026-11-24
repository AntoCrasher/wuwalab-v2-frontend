import type { AnchorHTMLAttributes, Ref } from 'react'
import { Link } from 'react-router-dom'

const OUTSIDE = /^([a-z][a-z0-9+.-]*:|\/\/)/i

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; ref?: Ref<HTMLAnchorElement> }

export function RouterLink({ href, ...rest }: Props) {
  if (OUTSIDE.test(href) || href.startsWith('/api/')) {
    return <a href={href} {...rest} />
  }
  return <Link to={href} {...rest} />
}
