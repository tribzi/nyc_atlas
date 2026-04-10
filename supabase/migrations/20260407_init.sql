-- Create the main Maps table
CREATE TABLE maps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    author TEXT,
    description TEXT,
    publication_date TEXT,
    data_sources TEXT,
    last_updated TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create the Themes table (to hold your bulleted list of topics)
CREATE TABLE themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

-- Create the Join Table (Many-to-Many relationship)
CREATE TABLE map_themes (
    map_id UUID REFERENCES maps(id) ON DELETE CASCADE,
    theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
    PRIMARY KEY (map_id, theme_id)
);

-- Optional: Create the Folders table for user accounts later
CREATE TABLE user_folders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Will link to Supabase Auth eventually
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
