import { AuthBindings } from "@refinedev/core";
import nookies from "nookies";

import { IUser, IUserToken, UserRole } from "src/interfaces";
import { setUserToken } from "src/hooks/auth.hook";
import { supabaseClientPublic } from "./supabaseClient";
import { useGetUser } from "src/hooks/rbac.hooks";

export const authProvider = (): AuthBindings => {
  return {
    login: async ({ email, password }) => {
      console.log("login");
      const { data, error } = await supabaseClientPublic.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error, };
      }

      if (data?.session) {
        const users = await supabaseClientPublic.from('Users').select("*").eq("id", data.user.id).maybeSingle<IUser>();

        if (!users.error && users.data) {
          const result: IUserToken = data.session as unknown as IUserToken;
          result.user = users.data;
          if (typeof window !== 'undefined') localStorage.setItem("auth-current-user", JSON.stringify(result ?? ""))
          nookies.set(null, "token", data.session.access_token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });

          return {
            success: true,
            redirectTo: "/",
          };
        }
      }
      // for third-party login
      return {
        success: false,

        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    },
    logout: async () => {
      console.log("logout");
      nookies.destroy(null, "token");
      if (typeof window !== 'undefined') localStorage.removeItem("auth-current-user")
      const { error } = await supabaseClientPublic.auth.signOut();

      if (error) {
        return {
          success: false,
          error,
        };
      }

      return {
        success: true,
        redirectTo: "/home",
      };
    },
    register: async ({ email, password }) => {
      console.log("register")
      try {
        const { data, error } = await supabaseClientPublic.auth.signUp({
          email,
          password,
        });

        if (error) return { success: false, error };

        if (data) {
          return { success: true, redirectTo: "/" };
        }

      } catch (error: any) {
        return { success: false, error, };
      }
      return {
        success: false,
        error: {
          message: "Register failed",
          name: "Invalid email or password",
        },
      };
    },
    check: async (ctx) => {
      console.log("check")
      const { token } = nookies.get(ctx);
      const { data } = await supabaseClientPublic.auth.getUser(token);
      const { user } = data;
      if (user) {
        return {
          authenticated: true,
        };
      }
      if (typeof window !== 'undefined') localStorage.removeItem("auth-current-user")
      return {
        authenticated: false,
        redirectTo: "/",
      };
    },
    getPermissions: async () => {
      console.log("getPermissions");
      const user = await supabaseClientPublic.auth.getUser();
      // console.log(user)
      if (user) {
        return user.data.user?.role;
      }

      return null;
    },
    getIdentity: async () => {
      console.log("getIdentity");
      let data;
      if (typeof window !== 'undefined') data = localStorage.getItem("auth-current-user")
      // const data = await supabaseClientPublic.auth.getUser();
      if (data) {
        const auth: IUserToken = JSON.parse(data ?? "")
        // const auth: IUserToken = data.data as IUserToken;
        auth.user.role ??= UserRole.Customer
        return auth.user;
      }
      return null;
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
  }
};
