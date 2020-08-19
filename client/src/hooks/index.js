import { useContext, useEffect } from "react";

import {
  login,
  isAuthenticated,
  logout,
  deleteUserAccount,
  register,
} from "auth";
import { DataContext, UIContext } from "providers/StoresProvider";
import { AuthContext } from "providers/AuthProvider";
import { SnackBarContext } from "providers/SnackBarProvider";
import { getErrorString } from "js_common";

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

function useSnackBarHandler() {
  return useContext(SnackBarContext);
}

export function useCloseSnackBar() {
  const snackBarHandler = useSnackBarHandler();

  return (msg) => snackBarHandler.current.closeSnackBar(msg);
}

export function useRemoveSnackBar() {
  const snackBarHandler = useSnackBarHandler();

  return (msg) => snackBarHandler.current.removeSnackBar(msg);
}

export function useShowSnackBar() {
  const snackBarHandler = useSnackBarHandler();

  return (msg, options) => {
    snackBarHandler.current.showSnackBar(msg, options);
  };
}

export function useLogin() {
  const auth = useAuth();
  const dataStore = useDataStore();
  const uiStore = useUIStore();

  async function _(user) {
    uiStore.loading = true;
    if (!isAuthenticated()) {
      try {
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

export function useCreateNewItem() {
  const uiStore = useUIStore();
  const dataStore = useDataStore();
  const showSnackBar = useShowSnackBar();

  async function _(item) {
    uiStore.loading = true;
    try {
      await dataStore.createNewItem(item);
      uiStore.openModal("scrappingConfirmation");
    } catch (err) {
      const message = getErrorString(err);
      showSnackBar(message, { type: "error" });
    } finally {
      uiStore.loading = false;
    }
  }

  return _;
}

export function useConfirmNewItem() {
  const uiStore = useUIStore();
  const dataStore = useDataStore();
  const showSnackBar = useShowSnackBar();

  async function _() {
    uiStore.loading = true;
    try {
      await dataStore.confirmPendingItem();
    } catch (err) {
      const message = getErrorString(err);
      showSnackBar(message, { type: "error" });
    } finally {
      uiStore.loading = false;
    }
  }

  return _;
}

export function useRegister() {
  const uiStore = useUIStore();

  async function _(user) {
    uiStore.loading = true;
    try {
      await register(user);
    } finally {
      uiStore.loading = false;
    }
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
