import React from "react";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "../context/UserContext";
import {PermissionsProvider} from "../context/PermissionsContext";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

const AppProviders = ({children}) => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <PermissionsProvider>
                        {children}
                    </PermissionsProvider>
                </UserProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
};

export default AppProviders;