/**
 * react-router-dom shim for Astro.
 * In Astro, we don't need client-side routing. 
 * Links become regular <a> tags.
 */
import React from 'react';

// Link component - renders a regular <a> tag
export function Link({ to, children, className, ...props }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <a href={to} className={className} {...props}>
            {children}
        </a>
    );
}

// useLocation - returns current window location
export function useLocation() {
    const [pathname, setPathname] = React.useState('/');

    React.useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    return {
        pathname,
        search: typeof window !== 'undefined' ? window.location.search : '',
        hash: typeof window !== 'undefined' ? window.location.hash : '',
    };
}

// useNavigate - simple redirect
export function useNavigate() {
    return (path: string) => {
        window.location.href = path;
    };
}

// useParams - stub
export function useParams() {
    return {};
}

// useSearchParams - reads URL search params
export function useSearchParams(): [URLSearchParams, (params: URLSearchParams) => void] {
    const [params, setParams] = React.useState(new URLSearchParams(typeof window !== 'undefined' ? window.location.search : ''));
    return [params, (newParams: URLSearchParams) => setParams(newParams)];
}

// BrowserRouter - just renders children (no routing needed in Astro)
export function BrowserRouter({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

// HashRouter - same as BrowserRouter
export function HashRouter({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

// Routes - just renders children
export function Routes({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

// Route - stub
export function Route({ element }: { path?: string; element?: React.ReactNode }) {
    return <>{element}</>;
}

