import { useContext, useEffect } from "react";

import { login, isAuthenticated, logout, deleteUserAccount } from "auth";
import { DataContext, UIContext } from "providers/StoresProvider";
import { AuthContext } from "providers/AuthProvider";

export function useCheckAuth() {
  const auth = useAuth();
  const login = useLogin();

  useEffect(() => {
    if (isAuthenticated() && !auth.isAuthenticated) {
      auth.setAuthentication(true);
      login();
    }
  });
}

export function useLogin() {
  const auth = useAuth();
  const dataStore = useDataStore();
  const uiStore = useUIStore();

  async function _(user) {
    uiStore.loading = true;
    if (!isAuthenticated()) {
      try {
        if (user === undefined) return;
        await login(user);
      } catch (err) {
        uiStore.loading = false;
        throw err;
      }
    }

    await dataStore.getDataOnLogin();
    auth.setAuthentication(true);
    uiStore.loading = false;
  }
  return _;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useDataStore() {
  return useContext(DataContext);
}

export function useUIStore() {
  return useContext(UIContext);
}

export function useLogout() {
  const auth = useAuth();
  async function _() {
    if (auth.isAuthenticated) {
      await logout();
      auth.setAuthentication(false);
    }
  }
  return _;
}

export function useDeleteAccount() {
  const logout = useLogout();
  const uiStore = useUIStore();
  async function _() {
    uiStore.loading = true;
    await deleteUserAccount();
    await logout();
    uiStore.loading = false;
  }
  return _;
}
