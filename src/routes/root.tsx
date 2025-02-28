import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const Layout = lazy(() => import('../pages/Layout'));
const MasonryGrid = lazy(() => import('../features/masonry-grid/components/MasonryGrid'));
const ItemDetails = lazy(() => import('../pages/ItemDetails'));

export const router = createBrowserRouter([
    {
		path: '/',
        element: <Layout />,
        children: [
        {
            index: true,
            element: <MasonryGrid />,
        },
        {
            path: 'items/:itemId',
            element: <ItemDetails />,
        },
        ],
    },
]);