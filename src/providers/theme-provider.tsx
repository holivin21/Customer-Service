"use client";
import { RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const ThemeProvider = ({ children }: any) => {
  const customTheme = extendTheme({
    ...RefineThemes.Blue,
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
  });

  return (
    <ChakraProvider  theme = { customTheme } >
    { children }
    </ChakraProvider >

  )
}
