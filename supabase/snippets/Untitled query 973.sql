ALTER TABLE map_themes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can link themes" ON map_themes;

CREATE POLICY "Anyone can link themes"
ON map_themes FOR INSERT
WITH CHECK (true);

-- Ensure themes can be read publicly so the directory loads properly
DROP POLICY IF EXISTS "Public can read themes" ON map_themes;

CREATE POLICY "Public can read themes"
ON map_themes FOR SELECT
USING (true);