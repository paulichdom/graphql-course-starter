import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './providers/AuthProvider';
import { RouterProvider } from 'react-router-dom';
import client from './client';
import router from './router';

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
