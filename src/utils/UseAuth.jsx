import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { TokenContext } from "./TokenContext";
import { USER } from "../api/user";
import { useNavigate } from "react-router-dom";

export const UseAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const checkAccessTokenValidity = async () => {
    console.log("token", token);
    if (token !== null) {
      try {
        const checkReq = { token: token };
        const response = await USER.CHECK(checkReq);
        console.log("response", response);
        if (response.status === 200) {
          console.log("Token is valid");
        } else {
          console.log("Token is invalid");
          try {
            const refreshTokResp = await USER.GET_TOC(user.tokenId);
            const { refreshToken } = refreshTokResp.data;

            const refreshReq = { refreshToken: refreshToken };
            const accessTokResp = await USER.REFRESH(refreshReq);
            if (accessTokResp.status === 200) {
              const { accessToken } = accessTokResp.data;
              setToken(accessToken);
              await localStorage.setItem("token", accessToken);
            } else {
              logOut();
            }
          } catch (error) {
            console.error("Error obtaining new access token:", error);
          }
        }
      } catch (error) {
        console.error("Error checking token validity:", error);
      }
    } else {
      logOut();
    }
  };

  const clearStorage = async () => {
    try {
      await localStorage.setItem("user", null);
      await localStorage.setItem("token", null);
      console.log("Storage successfully cleared!");
    } catch (e) {
      console.log("Failed to clear the async storage.");
    }
  };

  const logOut = () => {
    setToken(null);
    setUser(null);
    clearStorage();
    console.log("Logging out...");
    navigate("/server-timeout");
  };

  return {
    user,
    setUser,
    token,
    setToken,
    checkAccessTokenValidity,
    clearStorage,
    logOut,
  };
};
