import { useProvideAuth } from "../../hooks/Auth";
import AuthContext from "../../contexts/authContext";

const ProvideAuth = ({children}) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default ProvideAuth;