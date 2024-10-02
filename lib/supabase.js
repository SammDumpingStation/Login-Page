import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lmkacltiplgjppjoanoh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxta2FjbHRpcGxnanBwam9hbm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxODE5NTIsImV4cCI6MjA0Mjc1Nzk1Mn0.YUKAOStImQ3ukSNAfNf8DIOL9HGi2oZo-PcUY79JzPY";

//lets us connect to our supabase cloud database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

//will create a user and logs them instantly
export const createUser = async (email, password, name) => {
  try {
    // Create new account (in auth table)
    const { data: newAccount, error: signUpError } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          email_confirm: true,
        },
      }
    );

    if (signUpError) {
      throw signUpError;
    }

    const authUserId = newAccount.user.id;
    // Creating the user in the users table
    const { data, error } = await supabase
      .from("users")
      .insert([{ id: authUserId, name: name, email: email }]);

    if (error) {
      throw error;
    }

    // Logging in the user
    const session = await signInUser(email, password);

    return session;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the original error
  }
};

//signs in the user
export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Re-throw the original error
  }
};

//gets the current user associated with the auth id
export const getCurrentUser = async (userId) => {
  try {
    // Query the users table using the Auth ID
    const { data, error } = await supabase
      .from("users")
      .select("*") // You can specify columns instead of '*'
      .eq("id", userId); // Assuming 'id' is the Auth ID column in your users table

    if (error) {
      throw error; // Handle the error appropriately
    }

    // Check if a user was found
    const user = data.length ? data[0] : null;

    return user; // This will return the user object or null if not found
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error; // Re-throw the original error
  }
};

export const updateUser = async (userId, formData) => {
  try {
    const updatedData = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number || null, // Set to null if empty
      avatar_url: formData.avatar || null, // Set to null if empty
    };
    const { data, error } = await supabase
      .from("users") // Name of your table
      .update(updatedData) // Object with updated values
      .eq("id", userId); // Update the user with this id

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error; // Re-throw the original error
  }
};

//Logs - out the current user
export const logOut = async () => {
  await supabase.auth.signOut();
};
