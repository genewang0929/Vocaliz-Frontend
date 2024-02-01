import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}