import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkStoredAuth } from "../../store/redux/AuthActions";
import LoadingOverlay from "../LoadingOverlay";

const AuthStartup = ({isTryingAutoLogin, setIsTryingAutoLogin}) => 
{
  const dispatch = useDispatch();
  // const [isTryingLogin, setIsTryingLogin] = useState(true);

  useEffect(() => {

    const checkAuth = async  () => {
      await dispatch(checkStoredAuth());
      setIsTryingAutoLogin(false);
    }

    checkAuth().catch((error) => {
    console.error("Error during authentication startup:", error);
    setIsTryingAutoLogin(false);
    });
    
  }, []);

  if(isTryingAutoLogin) 
  {
    return <LoadingOverlay message="Logging in..."/>;
  }

  return null;
};

export default AuthStartup;