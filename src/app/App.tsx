import { RouterProvider } from 'react-router-dom';
import { router } from './routes/root';
import { Suspense } from 'react';
import './App.css';

export default function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    );
}