import { Navigate, useLocation } from 'react-router-dom'
import { getLoggedInUser } from './auth'

function ProtectedRoute({ children }) {
  const user = getLoggedInUser()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute


