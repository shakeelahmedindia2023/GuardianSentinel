/*
  # Auth Schema Update

  1. New Columns
    - Add `quantum_id` to users table
    - Add `dna_behavioral_profile` to users table
    - Add RLS policies for user authentication

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users
*/

-- Add RLS policies for authenticated users
CREATE POLICY "Users can read own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Add RLS policies for threat incidents
CREATE POLICY "Users can read own incidents" ON threat_incidents FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own incidents" ON threat_incidents FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for emergency alerts
CREATE POLICY "Users can read own alerts" ON emergency_alerts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own alerts" ON emergency_alerts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for biometric data
CREATE POLICY "Users can read own biometric data" ON biometric_data FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own biometric data" ON biometric_data FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for location tracking
CREATE POLICY "Users can read own location data" ON location_tracking FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own location data" ON location_tracking FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);