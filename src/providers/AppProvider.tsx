import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface AppProvidersProps {
  children?: ReactNode;
}

const queryClient = new QueryClient();

export const AppProviders = ({ children }: AppProvidersProps) => (
    <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    </QueryClientProvider>
)