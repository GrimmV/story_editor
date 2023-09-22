import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { checkTokenExpiry } from "./fetching/auth";
import { Box } from "@mui/material";
import Menu from "./Components/Menu/Menu";
import { useQuery } from "react-query";
import StoryOverview from "./Components/Story/Stories/StoryOverview";
import { getToken } from "./utils/getToken";
import Editor from "./Components/Story/Editor/Editor";
import { fetchLoadingHandler } from "./utils/fetchLoadingHandler";

function App() {
  let token = getToken();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleTokenExpiry = () => {
    if (token) {
      return checkTokenExpiry(token);
    } else {
      return false;
    }
  };

  const {
    data: tokenNotExpired,
    isError: isError,
    isLoading: isLoading,
  } = useQuery("tokenExpiry", handleTokenExpiry);

  useEffect(() => {
    if(tokenNotExpired !== undefined) {
      setIsAuthorized(tokenNotExpired);
    }
  }, [tokenNotExpired]);

  const loadingResult = fetchLoadingHandler(
    [isLoading],
    ["Token expiration"]
  );

  if (loadingResult) return loadingResult;
  // if (isError) {
  //   setIsAuthorized(false)
  // }

  const logout = () => {
    setIsAuthorized(false);
    localStorage.clear("jwt");
  };

  return (
    <BrowserRouter>
      {!isAuthorized ? (
        <Login setIsLoggedIn={() => setIsAuthorized(true)} />
      ) : (
        <Box>
          <Menu logout={logout} />
          <Box sx={{ m: 5 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stories" element={<StoryOverview />} />
              {["/stories/:storyId", "/stories/:storyId/:frameId"].map(
                (path, index) => {
                  return <Route path={path} element={<Editor />} key={path} />;
                }
              )}
            </Routes>
          </Box>
        </Box>
      )}
    </BrowserRouter>
  );
}

export default App;
