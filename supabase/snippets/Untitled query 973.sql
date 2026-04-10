DO $$
DECLARE new_map_id uuid;
BEGIN

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Data2Go', 'https://www.data2go.nyc/', 'Measure of America', 'DATA2GO.NYC is a free, easy-to-use online mapping and data tool created by the nonprofit Measure of America of the Social Science Research Council...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Demographics', 'Population')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('ZOLA - Online Zoning Map', 'https://zola.planning.nyc.gov/', 'Department of City Planning (DCP)', '')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Planning', 'Land Use')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Compost Map', 'https://www.google.com/maps/d/u/0/viewer?mid=1Dudc_MgiFRdei0i0H06dgA4N0EWs-3vC&femb=1&ll=40.740187453032775%2C-73.91117835860352&z=12', 'Department of Sanitation (DSNY)', '')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Waste')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Oasis', 'https://www.oasisnyc.net/mapisdown.html?aspxerrorpath=/map.aspx', '', '')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Property', 'Public Information', 'Land Use')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYCityMap', 'https://experience.arcgis.com/experience/d826b115c87841d491c2b41fcb175305', 'Office of Technology and Innovation (OTI)', '')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Boundaries', 'Public Information')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Go', 'https://www.nycgo.com/maps-guides/interactive-map/', 'NYC Go', '')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Tourism')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('SLA Mapper (SLAM)', 'https://slam.beta.nyc/', 'BetaNYC', 'Tool that aggregates data that community boards often have to gather in order to review liquor license applications and sidewalk café applications....')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Permits', 'Dining')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Boundaries Map', 'https://boundaries.beta.nyc/', 'BetaNYC', 'The NYC Boundaries Map – is a tool for viewing and querying overlapping administrative boundaries in NYC.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Boundaries', 'Politics')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Old NYC', 'https://www.oldnyc.org/', 'Dan Vanderkam and New York Public Library (NYPL)', '')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('History')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Live Subway Map', 'https://map.mta.info/', 'Metropolitan Transortation Authority (MTA)', 'See train arrivals, real-time alerts, current and future service, accessibility information, and more')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Transportation')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Mapping Segregation', 'https://www.nytimes.com/interactive/2015/07/08/us/census-race-map.html', 'New York Times', '')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Race and Ethnicity')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Sidewalk Widths NYC', 'https://www.sidewalkwidths.nyc/', 'Meli Harvey', 'This map is intended to give an impression of how sidewalk widths impact the ability of pedestrians to practice social distancing. Widths were...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Health', 'Transportation')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('2021 Democratic Primary Results', 'https://public.tableau.com/app/profile/jacob.matthew.dobkin/viz/DemocraticPrimary2021/LeadingDemocraticPrimaryCandidatesDashboard', 'Gothamist', 'A map of the Democratic primary election results from June, 2021. Ranked Choice first picks are mapped.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Politics', 'Elections')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Metro Region Explorer', 'https://metroexplorer.planning.nyc.gov/', 'Department of City Planning (DCP)', 'NYC is the center of a large metropolitan area that spans across city, county, and state boundaries. Though we are governed independently, many of...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Boundaries', 'Employment', 'Population')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Street Map', 'https://streets.planning.nyc.gov/', 'Department of City Planning (DCP)', 'NYC Street Map is an ongoing effort to digitize official street records, bring them together with other street information, and make them easily...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Transportation')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Inclusinary Housing Sites Webmap', 'http://hpd.maps.arcgis.com/apps/webappviewer/index.html?id=6d3f09240876403097c6d37a3c467917', 'Department of Housing Preservation and Development (HPD)', 'Interactive online zoning map for Inclusionary (affordable) Housing Projects in NYC')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Housing', 'Public Assistance')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Nature Map', 'https://naturalareasnyc.org/map', 'Natural Areas Conservancy', 'NYC Nature Map shows the location, size, and condition of natural resources in New York City’s public lands. This map also provides information...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Nature and Parks')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Tree Map', 'https://tree-map.nycgovparks.org/tree-map', 'NYC Parks', 'The New York City Street Tree Map brings New York City’s urban forest to your fingertips. For the first time, you have access to information about...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Nature and Parks')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Core Data NYC', 'https://app.coredata.nyc/', 'NYU Furman Center', 'CoreData.nyc is New York City’s housing and neighborhoods data hub, presented by the NYU Furman Center. The interactive data and mapping tool...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Housing', 'Public Assistance')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Population Fact Finder', 'https://popfactfinder.planning.nyc.gov/', 'Department of City Planning (DCP)', '')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Demographics', 'Population')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Facilities Map', 'https://capitalplanning.nyc.gov/facilities', 'Department of City Planning (DCP)', 'The most comprehensive dataset of public and private facilities and program sites that shape the quality of New York City neighborhoods')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Utilities', 'Public Information')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Zoning Index Map', 'https://www1.nyc.gov/assets/planning/pages/zoning-index-map/index.html', 'Department of City Planning (DCP)', 'An overlay map showing the boundaries of the Zoning Maps associated with the Zoning Resolution. Also see ZOLA.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Planning', 'Land Use')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Crash Mapper', 'https://crashmapper.org/#/', 'CHECKPEDS', 'A map of the road collisions and their resulting injuries and deaths reported to the NYPD.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Safety', 'Transportation')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Flood Hazard Mapper', 'http://dcp.maps.arcgis.com/apps/webappviewer/index.html?id=1c37d271fba14163bbb520517153d6d5', 'Department of City Planning (DCP)', 'A product of the New York City Department of City Planning, the NYC Flood Hazard Mapper provides a comprehensive overview of the coastal flood...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Safety', 'Water')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Waterfront Access Map', 'https://waterfrontaccess.planning.nyc.gov/data#10/40.7097/-73.9653', 'Department of City Planning (DCP)', 'A map of all land parcels where the public can access the waterfront.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Nature and Parks', 'Water')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('NYC Bike Map', 'https://www1.nyc.gov/html/dot/html/bicyclists/bikemaps.shtml', 'Department of Transportation (DOT)', 'The New York City Bike Map is a free bike map that the city produces each year and shows the network of existing and planned bicycle lanes, routes,...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Transportation')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Plow NYC', 'https://plownyc.cityofnewyork.us/plownyc/', 'Department of Sanitation (DSNY)', 'Welcome to New York City''s Official PlowNYC Website. The purpose of this Website is to allow the public to: (1) track the progress of DSNY...')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Resiliency and Climate')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('The pizza-iest neighborhood in Manhattan', 'https://dataviz.nyc/pizza', 'dataviz.nyc', 'A map that shows the density of pizzerias in Manhattan.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Dining')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('59 Community Boards', 'http://59boards.s3-website-us-east-1.amazonaws.com/', '', 'Information about upcoming community board meetings.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Planning')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Community District Profiles', 'https://communityprofiles.planning.nyc.gov/', 'Department of City Planning (DCP)', 'Information about the population, demographics, and land use in each Community District.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Demographics', 'Land Use', 'Population')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Welikia', 'https://www.welikia.org/map-explorer#9.5/40.7213/-73.9741', 'Eric Sanderson, Wildlife Conservation Society (WCS)', 'Shows NYC''s pre-colonial natural environment and ecology.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Nature and Parks')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Air Quality Monitoring Sites', 'https://data.gis.ny.gov/datasets/nysdec::air-quality-monitoring-sites/explore?location=40.702096%2C-73.980777%2C11', 'NYC Department of Environmental Conservation (DEC)', '')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Resiliency and Climate')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO maps (title, url, author, description) 
  VALUES ('Open Sewer Atlas', 'http://openseweratlas.tumblr.com/map', 'Korin Tangtrakul', 'Shows the sewer-sheds and sewer outfalls.')
  ON CONFLICT (url) DO UPDATE SET title = EXCLUDED.title 
  RETURNING id INTO new_map_id;

  IF new_map_id IS NOT NULL THEN
    INSERT INTO map_themes (map_id, theme_id)
    SELECT new_map_id, id FROM themes WHERE name IN ('Utilities', 'Waste', 'Water')
    ON CONFLICT DO NOTHING;
  END IF;

END $$;