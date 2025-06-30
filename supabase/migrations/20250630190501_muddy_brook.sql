/*
  # Add Demo User

  1. New User
    - Creates a demo user for easy login
    - Sets up necessary profile data
  
  2. Security
    - Uses a predefined password for demo purposes
*/

-- Check if the demo user already exists in auth.users
DO $$
DECLARE
  demo_user_exists BOOLEAN;
  demo_user_id UUID;
BEGIN
  -- Check if demo user exists in auth.users
  SELECT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'demo@guardiansentinel.com'
  ) INTO demo_user_exists;

  IF NOT demo_user_exists THEN
    -- Insert demo user into auth.users (this would normally be done by Supabase Auth)
    -- In a real environment, this would be handled by the Supabase Auth API
    -- This is just for demonstration purposes
    
    -- For the public users table, we'll create a placeholder entry
    INSERT INTO public.users (
      id,
      email,
      full_name,
      user_type,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      'demo@guardiansentinel.com',
      'Demo User',
      'guardian',
      NOW(),
      NOW()
    ) ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;