import "../styles/globals.css";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { customTheme, darkTheme, lightTheme } from "../themes";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Props extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps, theme = "dark" }: Props) {
  const [currentTheme, setcurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get("theme") || "light";
    const selectedTheme =
      cookieTheme === "light"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme;

    setcurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: "light" };

//   const validThemes = ["light", "dark", "custom"];

//   return {
//     theme: validThemes.includes(theme) ? theme : "dark",
//   };
// };

export default MyApp;
