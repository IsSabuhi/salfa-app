import { RouterProvider } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { router } from './routers';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
