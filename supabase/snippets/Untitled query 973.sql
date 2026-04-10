INSERT INTO themes (name) VALUES 
('Boundaries'), ('Demographics'), ('Dining'), ('Elections'), 
('Employment'), ('Health'), ('History'), ('Housing'), 
('Land Use'), ('Nature and Parks'), ('Permits'), ('Planning'), 
('Politics'), ('Population'), ('Property'), ('Public Assistance'), 
('Public Information'), ('Race and Ethnicity'), ('Resiliency and Climate'), 
('Safety'), ('Tourism'), ('Transportation'), ('Utilities'), 
('Waste'), ('Water')
ON CONFLICT (name) DO NOTHING;