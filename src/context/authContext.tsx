import { createContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../services/supabaseConnection";
import type { User } from "@supabase/supabase-js";

interface AuthProviderProps {
  children: ReactNode;
}

interface Profile {
  id: string;
  name: string | null;
}

type AuthContextData = {
  user: User | null;
  profile: Profile | null;
  signed: boolean;
  loadingAuth: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  async function loadProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Erro ao carregar profile:", error.message);
      return;
    }

    setProfile(data);
  }

  useEffect(() => {
    // Busca sessão existente
    async function loadUser(){
        await supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);

            if (data.user) {
                loadProfile(data.user.id);
            } else {
                setProfile(null);
            }

            setLoadingAuth(false);
        });

        // Escuta mudanças de auth
        const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
            setUser(session?.user ?? null);

            if (session?.user) {
            loadProfile(session.user.id);
            } else {
            setProfile(null);
            }
        }
        );

        return () => {
        listener.subscription.unsubscribe();
        };
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        signed: !!user,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
