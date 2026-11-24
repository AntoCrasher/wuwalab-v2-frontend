import { Link } from 'react-router-dom'

export function AdminBack({ to = '/admin', label = 'Admin' }: { to?: string; label?: string }) {
  return (
    <Link to={to} className="admin-back">
      ← {label}
    </Link>
  )
}
