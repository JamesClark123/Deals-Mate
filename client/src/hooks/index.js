import { useContext, useEffect } from "react";

import { login, isAuthenticated, logout } from "auth";
import { DataContext, UIContext } from "providers/StoresProvider";
import { AuthContext } from "providers/AuthProvider";

export function useLogin() {
  const setAuth = useSetAuthentication();
  const dataStore = useDataStore();
  const uiStore = useUIStore();

  async function _(user) {
    if (isAuthenticated()) {
      uiStore.loading = true;
      await dataStore.getDataOnLogin();
      setAuth();
      uiStore.loading = false;
      return true;
    }
    if (user === undefined) return false;
    uiStore.loading = true;
    try {
      await login(user);
    } catch {
      uiStore.loading = false;
      return false;
    }
    await dataStore.getDataOnLogin();
    setAuth();
    uiStore.loading = false;
    return true;
  }
  useEffect(() => {
    if (isAuthenticated()) {
      _();
    }
  }, []);
  return _;
}

export function useDataStore() {
  return useContext(DataContext);
}

export function useUIStore() {
  return useContext(UIContext);
}

function useSetAuthentication() {
  const authContext = useContext(AuthContext);
  return () => authContext.setAuthentication(true);
}

function useUnsetAuthentication() {
  const authContext = useContext(AuthContext);
  return () => authContext.setAuthentication(false);
}

export function useLogout() {
  const unsetAuth = useUnsetAuthentication();
  async function _() {
    if (isAuthenticated()) {
      await logout();
      unsetAuth();
    }
  }
  return _;
}
