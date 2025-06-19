import { Loader2 } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const AuthRouteProtection: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    async function getToken() {
      try {
        const data = window.localStorage.getItem("Etender-token");
        setToken(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    }

    getToken();
  }, []);

  if (loading) {
    return (
      <div className="bg-background h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AuthRouteProtection;
