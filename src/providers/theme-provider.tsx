"use client";
import { RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";

export const ThemeProvider = ({ children }:any) => (
    // Available themes: Blue, Purple, Magenta, Red, Orange, Yellow, Green
    // Change the line below to change the theme
    <ChakraProvider theme={RefineThemes.Magenta}>
      {children}
    </ChakraProvider>
);