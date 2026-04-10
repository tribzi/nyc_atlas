-- 1. Create a public bucket called 'map-thumbnails'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('map-thumbnails', 'map-thumbnails', true);

-- 2. Allow anyone to view the images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'map-thumbnails');

-- 3. Allow anyone to upload images (we will lock this down with Auth later)
CREATE POLICY "Allow Uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'map-thumbnails');