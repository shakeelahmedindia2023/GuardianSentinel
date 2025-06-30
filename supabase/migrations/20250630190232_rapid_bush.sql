/*
  # Add INSERT policy for users table

  1. Security
    - Add policy for authenticated users to insert their own profile data during sign-up
    - Ensures users can only insert data with their own auth.uid() as the id

  This fixes the RLS violation error that occurs when new users try to sign up
  and insert their profile data into the users table.
*/

CREATE POLICY "Users can insert own profile data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);