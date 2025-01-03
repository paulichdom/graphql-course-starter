import { ReactNode, createContext, useContext } from "react";
import { MeDocument, MeQuery, useLoginMutation, useLogoutMutation, useMeQuery, useSignupMutation } from "./queries.generated";
import { UserRole } from "../../types/graphql";
import client from "../../client";

export interface SignupInput {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

interface AuthContextType {
  user: MeQuery['me'] | null;
  isLoading: boolean;
  error: Error | null;
  isLoggedIn: boolean;
  signup: (input: SignupInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {data, loading, error} = useMeQuery()

  const value = {
    user: data?.me || null,
    isLoading: loading,
    error: error || null,
    isLoggedIn: !!data?.me,
  };

  const [signupMutation] = useSignupMutation({
    onCompleted: (data) => {
      client.cache.writeQuery({
        query: MeDocument,
        data: {me: data.signup}
      })
    }
  });

  const [loginMutation] = useLoginMutation({
    onCompleted: (data) => {
      client.cache.writeQuery({
        query: MeDocument,
        data: {me: data.login}
      })
    }
  });

  const [logoutMutation] = useLogoutMutation({
    onCompleted: () => {
      client.cache.reset()
      window.location.href = '/'
    } 
  });

  const signup = async (input: SignupInput) => {
    await signupMutation({
      variables: {
        input: {
          name: input.name,
          email: input.email,
          password: input.password,
          role: input.isAdmin ? UserRole.ADMIN : UserRole.USER
        }
      }
    })
  };
  const login = async (input: LoginInput) => {
    await loginMutation({
      variables: {
        input
      }
    })
  };

  const logout = async () => {
    await logoutMutation()
  };

  return (
    <AuthContext.Provider value={{ ...value, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
