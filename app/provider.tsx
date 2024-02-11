"use client";
import { ThemeProvider, useTheme } from "next-themes";
import { ConfigProvider, theme as ThemeAntd } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { curUser } from "./service/auth";

export const CustomProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const { darkAlgorithm, defaultAlgorithm } = ThemeAntd;
  const [themeSelected, setthemeSelected] = useState("dark");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      curUser(token)
        .then((resp) => {
          if (resp.status == 200) {
            router.push("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          router.push("/auth");
        });
    } else {
      router.push("/auth");
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme={themeSelected}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
};
