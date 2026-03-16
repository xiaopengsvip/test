import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate('/', { state: { openLogin: true, from: location.state?.from }, replace: true });
  }, [navigate, location]);

  return null;
}
