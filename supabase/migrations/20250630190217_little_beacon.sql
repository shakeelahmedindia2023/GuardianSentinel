/*
  # Fix RLS Policies Migration

  1. Changes
    - Add existence checks before creating each policy
    - Maintain all the same policies but prevent errors if they already exist
    - Use DO blocks with PL/pgSQL to conditionally create policies
*/

-- Add RLS policies for authenticated users with existence checks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Users can update own data'
  ) THEN
    CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Users can insert own data'
  ) THEN
    CREATE POLICY "Users can insert own data" ON users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Add RLS policies for threat incidents with existence checks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'threat_incidents' AND policyname = 'Users can read own incidents'
  ) THEN
    CREATE POLICY "Users can read own incidents" ON threat_incidents FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'threat_incidents' AND policyname = 'Users can insert own incidents'
  ) THEN
    CREATE POLICY "Users can insert own incidents" ON threat_incidents FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Add RLS policies for emergency alerts with existence checks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'emergency_alerts' AND policyname = 'Users can read own alerts'
  ) THEN
    CREATE POLICY "Users can read own alerts" ON emergency_alerts FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'emergency_alerts' AND policyname = 'Users can insert own alerts'
  ) THEN
    CREATE POLICY "Users can insert own alerts" ON emergency_alerts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Add RLS policies for biometric data with existence checks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'biometric_data' AND policyname = 'Users can read own biometric data'
  ) THEN
    CREATE POLICY "Users can read own biometric data" ON biometric_data FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'biometric_data' AND policyname = 'Users can insert own biometric data'
  ) THEN
    CREATE POLICY "Users can insert own biometric data" ON biometric_data FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Add RLS policies for location tracking with existence checks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'location_tracking' AND policyname = 'Users can read own location data'
  ) THEN
    CREATE POLICY "Users can read own location data" ON location_tracking FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'location_tracking' AND policyname = 'Users can insert own location data'
  ) THEN
    CREATE POLICY "Users can insert own location data" ON location_tracking FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;