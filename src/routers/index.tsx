import MainLayout from '@/Layouts/MainLayout/MainLayout';
import CreateProductPage from '@/pages/CreateProductPage';
import HomePage from '@/pages/HomePage';
import ProductPage from '@/pages/ProductPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'products/:id',
          element: <ProductPage />,
        },
        {
          path: 'create-product',
          element: <CreateProductPage />,
        },
      ],
    },
  ],
  {
    basename: '/salfa-app',
  }
);
