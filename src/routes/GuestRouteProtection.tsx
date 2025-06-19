import { Loader2 } from "lucide-react";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface props {
  children: ReactNode;
}

const GuestRouteProtection = ({ children }: props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

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

  return (
    <Fragment>
      {!token ? children : <Navigate to="/dashboard" replace />}
    </Fragment>
  );
};

export default GuestRouteProtection;
