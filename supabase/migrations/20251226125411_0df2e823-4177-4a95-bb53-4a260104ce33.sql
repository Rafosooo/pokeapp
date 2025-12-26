-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create pokemon_teams table
CREATE TABLE public.pokemon_teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id TEXT NOT NULL,
  game_name TEXT NOT NULL,
  team_name TEXT NOT NULL DEFAULT 'Meu Time',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on pokemon_teams
ALTER TABLE public.pokemon_teams ENABLE ROW LEVEL SECURITY;

-- Pokemon teams policies
CREATE POLICY "Users can view their own teams" 
ON public.pokemon_teams 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own teams" 
ON public.pokemon_teams 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own teams" 
ON public.pokemon_teams 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own teams" 
ON public.pokemon_teams 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create team_pokemon table (pokemon in each team)
CREATE TABLE public.team_pokemon (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.pokemon_teams(id) ON DELETE CASCADE,
  pokemon_id INTEGER NOT NULL,
  pokemon_name TEXT NOT NULL,
  slot INTEGER NOT NULL CHECK (slot >= 1 AND slot <= 6),
  nickname TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, slot)
);

-- Enable RLS on team_pokemon
ALTER TABLE public.team_pokemon ENABLE ROW LEVEL SECURITY;

-- Team pokemon policies (inherit from parent team)
CREATE POLICY "Users can view pokemon in their teams" 
ON public.team_pokemon 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.pokemon_teams 
    WHERE id = team_pokemon.team_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can add pokemon to their teams" 
ON public.team_pokemon 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.pokemon_teams 
    WHERE id = team_pokemon.team_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update pokemon in their teams" 
ON public.team_pokemon 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.pokemon_teams 
    WHERE id = team_pokemon.team_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can remove pokemon from their teams" 
ON public.team_pokemon 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.pokemon_teams 
    WHERE id = team_pokemon.team_id 
    AND user_id = auth.uid()
  )
);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username)
  VALUES (new.id, new.raw_user_meta_data ->> 'username');
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pokemon_teams_updated_at
  BEFORE UPDATE ON public.pokemon_teams
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();