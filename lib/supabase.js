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

    // Return the error if there's a sign-up error
    if (signUpError) {
      let message;
      if (signUpError.message === "User already registered") {
        message =
          "This email is already registered. Please use a different email or sign in instead.";
      } else {
        message =
          "We're experiencing some technical issues. Please try again later.";
      }
      return { user: null, error: { message } };
    }

    const authUserId = newAccount.user.id;

    // Insert user data into custom "users" table
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert([{ id: authUserId, name: name, email: email }]);

    if (userError) {
      return { user: null, error: userError };
    }

    // Logging in the user
    const { user: signInUserData, error: signInError } = await signInUser(
      email,
      password
    );

    if (signInError) {
      return { user: null, error: signInError };
    }

    // Return the user data after successful sign in
    return { user: signInUserData, error: null };
  } catch (error) {
    return {
      user: null,
      error: {
        message:
          "Oops! Something went wrong on our end. Please try again later.",
      },
    };
  }
};

//signs in the user
export const signInUser = async (email, password) => {
  try {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return {
        user: null,
        error: {
          message:
            "We couldn't log you in. Please check your email and password and try again.",
        },
      };
    }

    return { user, error: null };
  } catch (error) {
    console.error("Unexpected error during sign in:", error);
    return {
      user: null,
      error: {
        message:
          "Oops! Something went wrong on our end. Please try again later.",
      },
    };
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
      return { data: null, error: error };
    }

    // Check if a user was found
    const user = data.length ? data[0] : null;

    return { data: user, error: null }; // This will return the user object or null if not found
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error; // Re-throw the original error
  }
};

export const updateUser = async (userId, data) => {
  try {
    const updatedData = {
      name: data.name,
      email: data.email,
      phone_number: data.phone_number, // Set to null if empty
    };

    // Update in custom "users" table
    const { data: updatedUser, error: userError } = await supabase
      .from("users")
      .update(updatedData)
      .eq("id", userId);

    if (userError) {
      return { data: null, error: userError };
    }

    // Update in Supabase auth table (if email is changed)
    const { error: authError } = await supabase.auth.updateUser({
      email: data.email, // Pass the new email
    });

    if (authError) {
      console.log("Error updating email in auth:", authError.message);
      return { data: updatedUser, error: authError };
    }

    return { data: updatedUser, error: null }; // Return the updated user data and no error
  } catch (error) {
    console.error("Error updating user:", error);
    return { data: null, error }; // Return the caught error
  }
};

//Logs - out the current user
export const logOut = async () => {
  await supabase.auth.signOut();
};
