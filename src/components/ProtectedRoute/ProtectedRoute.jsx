import { useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { isAuthorized } from "../../requestsService/user";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const checkAuth = async () => {
      const autorized = await isAuthorized();
      if (autorized) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, [children]);

  return (
    <>
      {isAuthenticated ? (
        children
      ) : loading ? (
        <div></div>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: location.pathname,
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
