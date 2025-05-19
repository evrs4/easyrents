import { create } from "zustand";
import { supabase } from '../utils/SupaClient';

export const useAuth = create((set) => ({
  user: null,
  auth: false,
  full_name: "",
  role: "",
  email: "",
  loading: true,

  register: async (full_name, email, password) => {
    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        console.error("Sign-up error:", signUpError.message);
        set({ loading: false });
        throw signUpError;
      }

      const userId = signUpData?.user?.id;
      if (!userId) {
        console.error("User ID not found after sign-up.");
        set({ loading: false });
        throw new Error("User ID not found after sign-up.");
      }

      const { error: upsertError } = await supabase.from("profiles").upsert([
        {
          id: userId,
          full_name,
          email,
          role: 'user'
        },
      ]);

      if (upsertError) {
        console.error("Upsert profile error:", upsertError.message);
        set({ loading: false });
        throw upsertError;
      }

      set({
        full_name,
        email,
        loading: false,
      });

      return signUpData.user;
    } catch (error) {
      console.error("Unexpected registration error:", error);
      set({ loading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        set({ loading: false });
        throw error;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      set({
        user: data.user,
        auth: true,
        full_name: profileData?.full_name || '',
        email: profileData?.email || data.user.email,
        role: profileData?.role || 'user',
        loading: false,
      });

      return data.user;
    } catch (error) {
      console.error("Unexpected login error:", error);
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
        throw error;
      }

      set({
        user: null,
        auth: false,
        full_name: "",
        email: "",
        role: "",
      });
    } catch (error) {
      console.error("Unexpected logout error:", error);
      throw error;
    }
  },

  fetchUser: async () => {
    try {
      set({ loading: true });
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;

      if (currentUser) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        set({
          user: currentUser,
          auth: true,
          full_name: profileData?.full_name || '',
          email: profileData?.email || currentUser.email,
          role: profileData?.role || 'user',
        });
      }
      
      set({ loading: false });
    } catch (error) {
      console.error("Fetch user error:", error);
      set({ loading: false });
    }
  },
}));