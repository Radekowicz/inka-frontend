import { useState, useEffect, useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { isAuthorized } from "../../requestsService/user";
import { removeUserFromLocalStorage } from "../../localStorage/user";
import { UserContext } from "../../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const checkAuth = async () => {
      const autorized = await isAuthorized();
      if (autorized) {
        setIsAuthenticated(true);
      } else {
        removeUserFromLocalStorage();
        setUser(null);
      }
      setLoading(false);
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            pathname: "/",
            state: location.pathname,
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
