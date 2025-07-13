import React from "react";
import ClerkWrapper from "./components/auth/ClerkWrapper";
import AuthenticatedLayout from "./components/auth/AuthenticatedLayout";
import { UserProvider } from "./context/UserContext";
import Routes from "./Routes";

function App() {
  return (
    <ClerkWrapper>
      <UserProvider>
        <AuthenticatedLayout>
          <Routes />
        </AuthenticatedLayout>
      </UserProvider>
    </ClerkWrapper>
  );
}

export default App;