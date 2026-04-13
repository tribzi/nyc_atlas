SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict gY9enLy6alESNHsm1uUiegVC7cHNXVHt2CpjN8qZD4LOZmvb5zcAWKNc2gOZ4Yr

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'ab30d4fd-5aed-4ae9-9f1f-5b6cd912cb92', '{"action":"user_signedup","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-10 23:54:27.999237+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b45c72a6-fcf2-4efa-ae8b-01e15aa18d98', '{"action":"login","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-10 23:54:28.00611+00', ''),
	('00000000-0000-0000-0000-000000000000', '14fddb70-c4b2-41fa-b841-7f46081648e0', '{"action":"user_recovery_requested","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-04-10 23:54:28.030301+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd686e527-c29a-4a4e-a3d6-415f2f40af89', '{"action":"login","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-10 23:58:21.123336+00', ''),
	('00000000-0000-0000-0000-000000000000', '6de7e699-7cf5-4723-b598-ce01f5f9efa1', '{"action":"user_recovery_requested","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-04-11 00:17:32.294661+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec95197e-0eaf-49fd-a5b8-fda2f1588ba3', '{"action":"login","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 00:17:46.136838+00', ''),
	('00000000-0000-0000-0000-000000000000', '0287462a-32d6-46e6-a9b3-4f5b5d06df6a', '{"action":"logout","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 00:18:06.935023+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ea748fc-b306-4d1c-872b-f8fcad293153', '{"action":"user_recovery_requested","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-04-11 00:18:25.575598+00', ''),
	('00000000-0000-0000-0000-000000000000', '6c6de5c8-7cb2-4f65-a8f5-c5165671af83', '{"action":"login","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 00:18:42.012325+00', ''),
	('00000000-0000-0000-0000-000000000000', '8fc8fb4e-a632-4f5a-850d-c4e5035570f9', '{"action":"logout","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 00:32:48.991114+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d0087ef-76f0-445b-a9a6-d9cb1346ef02', '{"action":"user_recovery_requested","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-04-11 01:20:45.758808+00', ''),
	('00000000-0000-0000-0000-000000000000', '9422dc16-a73c-479f-a0bd-0cb14f2e1230', '{"action":"login","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 01:20:58.13774+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb0eaf3f-ab54-422e-a025-c0c01e550a32', '{"action":"token_refreshed","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-11 02:19:02.247795+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d226672-9874-4788-8e68-98b3b5776ff2', '{"action":"token_revoked","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-11 02:19:02.24809+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b68f866b-4a94-4f1f-84c0-6ff073a16bb9', '{"action":"logout","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 02:34:16.476707+00', ''),
	('00000000-0000-0000-0000-000000000000', '125e4a90-3e0d-47ac-8058-22744b41eeca', '{"action":"user_recovery_requested","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-04-11 02:44:42.334671+00', ''),
	('00000000-0000-0000-0000-000000000000', '00c98f48-1411-4218-af09-3b5efa60dec5', '{"action":"login","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 02:44:46.213651+00', ''),
	('00000000-0000-0000-0000-000000000000', '256a92ba-84e1-4ad9-b1e9-2b48da6ff949', '{"action":"logout","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 02:54:41.669237+00', ''),
	('00000000-0000-0000-0000-000000000000', '591e0c77-741d-4bb4-83fd-72cc20149dff', '{"action":"user_recovery_requested","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-04-11 02:58:01.020815+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b4cc72c-183f-4c91-afc4-2d550b604dba', '{"action":"login","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 02:58:04.822897+00', ''),
	('00000000-0000-0000-0000-000000000000', '71088768-297f-4ef1-886a-8a0768192d69', '{"action":"logout","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 03:30:46.985053+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca5e05a6-8341-4a95-9caa-f2cd5801cc52', '{"action":"user_recovery_requested","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-04-11 03:35:16.766917+00', ''),
	('00000000-0000-0000-0000-000000000000', '9bf77ac6-7f52-45a6-a314-602e15a4fbc4', '{"action":"login","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-11 03:35:20.673569+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff07bea8-cbad-4d39-95b5-f52a8e8870ca', '{"action":"token_refreshed","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-12 04:04:53.866438+00', ''),
	('00000000-0000-0000-0000-000000000000', '20d5bfd0-75e0-494e-95a8-f97b6329ec74', '{"action":"token_revoked","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-12 04:04:53.866789+00', ''),
	('00000000-0000-0000-0000-000000000000', '72d2cf46-fcd2-464e-8f8e-c984e47171f4', '{"action":"token_refreshed","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-12 04:04:53.922787+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d8d2eb3-a8d4-44cc-9f3b-bfb388ccb199', '{"action":"token_refreshed","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-12 04:04:53.934196+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb1928ef-f978-4464-956b-fb809a1fffc3', '{"action":"token_refreshed","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-12 04:04:53.995429+00', ''),
	('00000000-0000-0000-0000-000000000000', '231f8815-cb82-4263-9a91-c5e0e039e7e5', '{"action":"token_refreshed","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-13 02:09:16.131474+00', ''),
	('00000000-0000-0000-0000-000000000000', '5112c805-e511-4c46-ae84-423dfc9a2042', '{"action":"token_revoked","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-13 02:09:16.131764+00', ''),
	('00000000-0000-0000-0000-000000000000', '66138506-2274-48ba-b077-df6b144b7983', '{"action":"logout","actor_id":"8123fb92-d0e2-43d4-afd4-20f18c508206","actor_username":"bahijnyc@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-13 03:07:03.359517+00', '');


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '8123fb92-d0e2-43d4-afd4-20f18c508206', 'authenticated', 'authenticated', 'bahijnyc@gmail.com', '$2a$10$yNTGzZ7WtzNFyJChrIzANeDUVMm9eBRFOMvGBniKQnqH7pqHaohF6', '2026-04-10 23:54:28.000647+00', NULL, '', NULL, '', '2026-04-11 03:35:16.767572+00', '', '', NULL, '2026-04-11 03:35:20.674761+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "8123fb92-d0e2-43d4-afd4-20f18c508206", "email": "bahijnyc@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-04-10 23:54:27.993918+00', '2026-04-13 02:09:16.132503+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('8123fb92-d0e2-43d4-afd4-20f18c508206', '8123fb92-d0e2-43d4-afd4-20f18c508206', '{"sub": "8123fb92-d0e2-43d4-afd4-20f18c508206", "email": "bahijnyc@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-04-10 23:54:27.997997+00', '2026-04-10 23:54:27.998049+00', '2026-04-10 23:54:27.998049+00', '7e526e61-2a8f-40c0-be4d-783421cbe326');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: folders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."folders" ("id", "user_id", "name", "created_at") VALUES
	('cc8d5a60-fa9e-4d83-95a1-d691a924a993', '8123fb92-d0e2-43d4-afd4-20f18c508206', 'third test', '2026-04-11 00:24:45.731675+00'),
	('59365cc7-418b-4cb9-b3dd-0d275d7a236b', '8123fb92-d0e2-43d4-afd4-20f18c508206', 'cool thing', '2026-04-11 00:25:41.044785+00'),
	('a0c0f2a7-a0a3-4465-8028-a1b1f115a586', '8123fb92-d0e2-43d4-afd4-20f18c508206', 'Parks', '2026-04-11 03:35:46.965764+00');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "email", "username", "submission_count") VALUES
	('8123fb92-d0e2-43d4-afd4-20f18c508206', 'bahijnyc@gmail.com', 'bahijnyc', 0);


--
-- Data for Name: maps; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."maps" ("id", "title", "url", "author", "description", "publication_date", "data_sources", "last_updated", "created_at", "image_url", "approved", "submitted_by") VALUES
	('4f1ca531-3721-417b-9eb1-b8d50de9d187', 'Oasis', 'https://www.oasisnyc.net/mapisdown.html?aspxerrorpath=/map.aspx', 'USDA Forest Service', 'Open Accessible Space Information System (OASIS) maps information about parks and open spaces.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'https://urbanomnibus.net/wp-content/uploads/sites/2/2009/09/Oasis1.jpg', true, NULL),
	('a5b9abff-6dd9-4181-ad34-f750418341a5', 'Plow NYC', 'https://plownyc.cityofnewyork.us/plownyc/', 'Department of Sanitation (DSNY)', 'A live map showing which streets have been plowed, when, and how many times, operated during snow storms.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'https://thumbs.6sqft.com/wp-content/uploads/2026/02/23112411/PlowNYC-Map.png?w=1040&format=webp', true, NULL),
	('f06e686d-8d21-434f-9331-50ff37e4a4b1', 'NYC Boundaries', 'https://boundaries.beta.nyc/?map=pp', 'Beta NYC', 'Displays the selected political or jurisdictional boundaries.', NULL, NULL, NULL, '2026-04-10 03:37:31.392934+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/0.01843182222937534.png', true, NULL),
	('9571c9f4-8748-43d1-bca9-446e9ac6fbf9', 'NYC Street Map', 'https://streets.planning.nyc.gov/', 'Department of City Planning (DCP)', 'NYC Street Map is an ongoing effort to digitize official street records, bring them together with other street information, and make them easily...', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/DCP_Street-map.png', true, NULL),
	('f8b315ce-7dfb-4f63-9b95-0ba44e6fb767', 'NYC Nature Map', 'https://naturalareasnyc.org/map', 'Natural Areas Conservancy (NAC)', 'NYC Nature Map shows the location, size, and condition of natural resources in New York City’s public lands. This map also provides information...', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/NAC_nature_map.png', true, NULL),
	('57ac1d92-a62b-47ea-98f6-70d3a42acf69', 'NYC Tree Map', 'https://tree-map.nycgovparks.org/tree-map', 'NYC Parks', 'The New York City Street Tree Map brings New York City’s urban forest to your fingertips. For the first time, you have access to information about...', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/NYC-Tree-Map.png', true, NULL),
	('064e2484-f7f9-4c41-88b3-64ce969c8003', 'Food Scrap Dropoffs', 'https://www.google.com/maps/d/u/0/viewer?mid=1Dudc_MgiFRdei0i0H06dgA4N0EWs-3vC&femb=1&ll=40.740187453032775%2C-73.91117835860352&z=12', 'Department of Sanitation (DSNY)', 'Locations of all DSNY food scrap dropoff locations.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/DSNY_food_scrap_dropoff.png', true, NULL),
	('52207cda-c3b8-4786-978e-14cb05d6147c', 'NYCityMap', 'https://experience.arcgis.com/experience/d826b115c87841d491c2b41fcb175305', 'Office of Technology and Innovation (OTI)', 'Combines a tremendous amount of public data about NYC physical features.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/OTI_NYCityMap.png', true, NULL),
	('e4eebc37-1615-4f33-87de-de7b5d56168a', 'ZOLA - Online Zoning Map', 'https://zola.planning.nyc.gov/', 'NYC Department of City Planning', 'NYC land use and zoning map.', NULL, NULL, NULL, '2026-04-10 03:03:04.246324+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/Screenshot%20From%202026-04-09%2023-25-16.png', true, NULL),
	('2ce86938-92ec-4c66-9e7c-5ca3b1b4319a', 'Old NYC', 'https://www.oldnyc.org/', 'Dan Vanderkam and New York Public Library (NYPL)', 'Geolocated historical photos of NYC from the NY Public Library collection.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/OldNYC.png', true, NULL),
	('04f9b8e3-305c-46db-a2a2-6317de7f2755', 'Mapping Segregation', 'https://www.nytimes.com/interactive/2015/07/08/us/census-race-map.html', 'New York Times', 'A dot density map of population by race throughout NYC.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/NYT_Mapping%20Segregation.png', true, NULL),
	('843ba701-e1ee-4b5a-8a98-f38ae520df5f', 'Zoning Index Map', 'https://www1.nyc.gov/assets/planning/pages/zoning-index-map/index.html', 'Department of City Planning (DCP)', 'An overlay map showing the boundaries of the Zoning Maps associated with the Zoning Resolution. Also see ZOLA.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/DCP_zoning-index-map.png', true, NULL),
	('d26db47d-b2ea-4ffa-b178-e3cf7ae60fe4', 'Population Fact Finder', 'https://popfactfinder.planning.nyc.gov/', 'Department of City Planning (DCP)', 'Select custom sets of census blocks to find information about population and demographics.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/DCP_population-fact-finder.png', true, NULL),
	('ebfba1e6-3407-4580-9af7-ec91b101f984', 'Sidewalk Widths NYC', 'https://www.sidewalkwidths.nyc/', 'Meli Harvey', 'Maps the width of every sidewalk in the city, created during the COVID pandemic to aid with social distancing.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/sidewalk-widths.png', true, NULL),
	('1b67c0cb-ee33-49af-b937-f5561ccff89b', '2021 Democratic Primary Results', 'https://public.tableau.com/app/profile/jacob.matthew.dobkin/viz/DemocraticPrimary2021/LeadingDemocraticPrimaryCandidatesDashboard', 'Gothamist', 'A map of the Democratic primary election results from June, 2021. Ranked Choice first picks are mapped.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/2021_democratic_primary.png', true, NULL),
	('43858aeb-b916-43e2-a121-cf057ba9ca76', 'SLA Mapper (SLAM)', 'https://slam.beta.nyc/', 'BetaNYC', 'Aggregates data that community boards often have to gather in order to review liquor license and sidewalk café applications.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'https://www.beta.nyc/wp-content/uploads/2018/10/DataDesignChallenges_BetaNYCReport_Oct2018_html_291c1384.png', true, NULL),
	('b5c3a6a9-c3dc-478a-9226-2576f648b15f', 'Inclusinary Housing Sites', 'http://hpd.maps.arcgis.com/apps/webappviewer/index.html?id=6d3f09240876403097c6d37a3c467917', 'Department of Housing Preservation and Development (HPD)', 'Interactive online zoning map for Inclusionary (affordable) Housing Projects in NYC', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/HPD_inclusionary_housing_sites.png', true, NULL),
	('6cb71d09-871d-4821-8c07-e9a7f1a2bbdb', 'Metro Region Explorer', 'https://metroexplorer.planning.nyc.gov/', 'Department of City Planning (DCP)', 'NYC is the center of a large metropolitan area that spans across city, county, and state boundaries. Though we are governed independently, many of...', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/DCP_Metro_region_explorer.png', true, NULL),
	('9ae78fb9-c665-4957-b868-4e6974eb150a', 'NYC Crash Mapper', 'https://crashmapper.org/#/', 'CHECKPEDS', 'A map of the road collisions and their resulting injuries and deaths reported to the NYPD.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/crash_mapper.png', true, NULL),
	('7d2d9d92-3c75-49cd-a008-48bf11f5bc2a', 'NYC Bike Map', 'https://www.nycbikemap.nyc/', 'Seth Holladay and Todd Lee-Millstein', 'A bike network map for NYC that combines information from NYC OpenData, Citi Bike and other sources. ', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/NYC_Bike_Map.png', true, NULL),
	('5d8bdfb1-4955-4285-b843-18324f0450a7', 'NYC Data2Go', 'https://www.data2go.nyc/', 'Measure of America', 'DATA2GO.NYC is a free, easy-to-use online mapping and data tool created by the nonprofit Measure of America of the Social Science Research Council...', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/Measure-of-America_Data2Go.png', true, NULL),
	('60a8d2d8-5f45-4ee7-808e-ce52d614b4d2', 'Capital Projects Portal', 'https://capitalprojects.nycplanningdigital.com/', 'Department of City Planning (DCP)', 'The most comprehensive dataset of public and private facilities and program sites that shape the quality of New York City neighborhoods', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/DCP_Capital-projects-portal.png', true, NULL),
	('fe433f67-2ebe-4bbe-b6c5-a5a39de9a9c2', 'NYC Flood Hazard Mapper', 'http://dcp.maps.arcgis.com/apps/webappviewer/index.html?id=1c37d271fba14163bbb520517153d6d5', 'Department of City Planning (DCP)', 'A product of the New York City Department of City Planning, the NYC Flood Hazard Mapper provides a comprehensive overview of the coastal flood...', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/DCP_flood_hazard_mapper.png', true, NULL),
	('7e04b02f-e23a-4b50-a937-cf85fb75b9b7', 'Core Data NYC', 'https://app.coredata.nyc/', 'NYU Furman Center', 'CoreData.nyc is New York City’s housing and neighborhoods data hub, presented by the NYU Furman Center. The interactive data and mapping tool...', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/Affordable_housing_map.png', true, NULL),
	('8084533c-fc87-430b-b92a-dd7ac670560f', 'Air Quality Monitoring Sites', 'https://data.gis.ny.gov/datasets/nysdec::air-quality-monitoring-sites/explore?location=40.702096%2C-73.980777%2C11', 'NYC Department of Environmental Conservation (DEC)', 'NYS air quality monitoring site data.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/air_quality_monitoring_sites.png', true, NULL),
	('7661d6c0-437c-49db-89c1-cf21c31be352', 'Open Sewer Atlas', 'http://openseweratlas.tumblr.com/map', 'Korin Tangtrakul', 'Shows the sewer-sheds and sewer outfalls.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/Open-sewer-atlas.png', true, NULL),
	('5f442049-303a-4471-8b37-5ab208104e41', 'The pizza-iest neighborhood in Manhattan', 'https://dataviz.nyc/pizza', 'Aaron Flee', 'A map that shows the density of pizzerias in Manhattan.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/pizza-map.png', true, NULL),
	('bc58f98c-9c67-42d3-95fe-e9cea3acebf8', 'Waterfront Access Map', 'https://waterfrontaccess.planning.nyc.gov/data#10/40.7097/-73.9653', 'Department of City Planning (DCP)', 'A map of all land parcels where the public can access the waterfront.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/DCP_waterfront-access-map.png', true, NULL),
	('c970dbad-6cfa-406a-b238-3747f0ed6ced', 'Welikia', 'https://www.welikia.org/map-explorer#9.5/40.7213/-73.9741', 'Eric Sanderson, Wildlife Conservation Society (WCS)', 'Shows NYC''s pre-colonial natural environment and ecology.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/Welikia.png', true, NULL),
	('8e41e466-bc92-48ad-b337-a4742474c778', 'Prospect Park Tree Keeper', 'https://prospectparkny.treekeepersoftware.com/index.cfm?deviceWidth=1280', 'Prospect Park Alliance', 'A map of all the trees in Prospect Park.', NULL, NULL, NULL, '2026-04-11 03:34:54.295953+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/0.6131715267187342.png', true, NULL),
	('b241bd0f-acf5-4e7e-954e-b6c33b3ba01c', '59 Community Boards', 'http://59boards.s3-website-us-east-1.amazonaws.com/', '', 'Information about upcoming community board meetings.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/59_community_boards.png', true, NULL),
	('ac5a5cc3-1754-4f6c-97c9-19f8a50474e5', 'Community District Profiles', 'https://communityprofiles.planning.nyc.gov/', 'Department of City Planning (DCP)', 'Information about the population, demographics, and land use in each Community District.', NULL, NULL, NULL, '2026-04-10 05:07:09.025235+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/DCP_community_district_profiles.png', true, NULL),
	('96833cd8-712b-4e0b-b6c3-52409070659d', 'AP Transit Map', 'https://aptransit.co/', 'Alexander Pozharov', 'A live subway map created by an independent developer.', '2026', NULL, NULL, '2026-04-13 02:49:00.212215+00', 'http://127.0.0.1:54321/storage/v1/object/public/map-thumbnails/thumbnails/aptransit.png', true, NULL);


--
-- Data for Name: themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."themes" ("id", "name") VALUES
	('96fd5887-9700-4ce6-9ee1-a67f39a054b6', 'Boundaries'),
	('f870c914-45b2-46da-b177-ad7f29089248', 'Demographics'),
	('4da3be06-66f6-4ea7-954e-165eecf4736c', 'Dining'),
	('962a088b-49de-4ac9-9024-3138dc77e5e7', 'Elections'),
	('0afcb9a0-6f04-4551-8846-1ddb6b1e6e78', 'Employment'),
	('693b0572-c6f5-4af1-a640-7c247788f621', 'Health'),
	('7be16a70-9d7f-41cc-b407-fc8925aff28f', 'History'),
	('0ecf6c03-d3ad-4ed6-acf9-af51eafa7c3a', 'Housing'),
	('1af0a2f9-4d60-44ec-94f2-4c5d3023d802', 'Land Use'),
	('6204cccd-7dfe-40c5-a04a-3ce211470cb0', 'Nature and Parks'),
	('91c31120-c3e0-4af0-91cb-8e578ddf9dea', 'Permits'),
	('9cf9abe6-1302-4e12-8e5a-1c6ffda60054', 'Planning'),
	('360d72c1-dc6e-406c-baa0-ed28ecf244f5', 'Politics'),
	('5ffee24e-266c-4b55-9476-1d7c69ee5702', 'Population'),
	('0fed888b-b49d-447d-b6a2-59c0b61463f0', 'Property'),
	('a5fdeede-9fb0-46dd-8a33-8bae98342f17', 'Public Assistance'),
	('58434809-07e1-4920-b569-3d337de4bed1', 'Public Information'),
	('ad3808f7-a35d-400e-b8ef-8932be38b3cb', 'Resiliency and Climate'),
	('83489cce-50fd-4cd8-b118-44b0b25228f2', 'Safety'),
	('dbf67a56-3792-401f-aa76-e5ad715f293f', 'Tourism'),
	('81b65863-ffae-4ed0-8d17-1dd2af34849b', 'Transportation'),
	('2d99a163-67b4-4711-8e85-a60cce584c00', 'Utilities'),
	('efa991e5-706f-4e7f-aaee-f6885b734ade', 'Waste'),
	('b7627e86-ad66-479c-a226-5d97b2a4f73e', 'Water'),
	('440d59b8-c1ab-4900-83c0-5c4dae94f07f', 'Education');


--
-- Data for Name: map_themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."map_themes" ("map_id", "theme_id") VALUES
	('e4eebc37-1615-4f33-87de-de7b5d56168a', '0fed888b-b49d-447d-b6a2-59c0b61463f0'),
	('e4eebc37-1615-4f33-87de-de7b5d56168a', '1af0a2f9-4d60-44ec-94f2-4c5d3023d802'),
	('e4eebc37-1615-4f33-87de-de7b5d56168a', '9cf9abe6-1302-4e12-8e5a-1c6ffda60054'),
	('5d8bdfb1-4955-4285-b843-18324f0450a7', 'f870c914-45b2-46da-b177-ad7f29089248'),
	('5d8bdfb1-4955-4285-b843-18324f0450a7', '5ffee24e-266c-4b55-9476-1d7c69ee5702'),
	('064e2484-f7f9-4c41-88b3-64ce969c8003', 'efa991e5-706f-4e7f-aaee-f6885b734ade'),
	('4f1ca531-3721-417b-9eb1-b8d50de9d187', '1af0a2f9-4d60-44ec-94f2-4c5d3023d802'),
	('4f1ca531-3721-417b-9eb1-b8d50de9d187', '0fed888b-b49d-447d-b6a2-59c0b61463f0'),
	('4f1ca531-3721-417b-9eb1-b8d50de9d187', '58434809-07e1-4920-b569-3d337de4bed1'),
	('52207cda-c3b8-4786-978e-14cb05d6147c', '96fd5887-9700-4ce6-9ee1-a67f39a054b6'),
	('52207cda-c3b8-4786-978e-14cb05d6147c', '58434809-07e1-4920-b569-3d337de4bed1'),
	('43858aeb-b916-43e2-a121-cf057ba9ca76', '4da3be06-66f6-4ea7-954e-165eecf4736c'),
	('43858aeb-b916-43e2-a121-cf057ba9ca76', '91c31120-c3e0-4af0-91cb-8e578ddf9dea'),
	('2ce86938-92ec-4c66-9e7c-5ca3b1b4319a', '7be16a70-9d7f-41cc-b407-fc8925aff28f'),
	('ebfba1e6-3407-4580-9af7-ec91b101f984', '693b0572-c6f5-4af1-a640-7c247788f621'),
	('ebfba1e6-3407-4580-9af7-ec91b101f984', '81b65863-ffae-4ed0-8d17-1dd2af34849b'),
	('1b67c0cb-ee33-49af-b937-f5561ccff89b', '962a088b-49de-4ac9-9024-3138dc77e5e7'),
	('1b67c0cb-ee33-49af-b937-f5561ccff89b', '360d72c1-dc6e-406c-baa0-ed28ecf244f5'),
	('6cb71d09-871d-4821-8c07-e9a7f1a2bbdb', '96fd5887-9700-4ce6-9ee1-a67f39a054b6'),
	('6cb71d09-871d-4821-8c07-e9a7f1a2bbdb', '0afcb9a0-6f04-4551-8846-1ddb6b1e6e78'),
	('6cb71d09-871d-4821-8c07-e9a7f1a2bbdb', '5ffee24e-266c-4b55-9476-1d7c69ee5702'),
	('9571c9f4-8748-43d1-bca9-446e9ac6fbf9', '81b65863-ffae-4ed0-8d17-1dd2af34849b'),
	('b5c3a6a9-c3dc-478a-9226-2576f648b15f', '0ecf6c03-d3ad-4ed6-acf9-af51eafa7c3a'),
	('b5c3a6a9-c3dc-478a-9226-2576f648b15f', 'a5fdeede-9fb0-46dd-8a33-8bae98342f17'),
	('f8b315ce-7dfb-4f63-9b95-0ba44e6fb767', '6204cccd-7dfe-40c5-a04a-3ce211470cb0'),
	('57ac1d92-a62b-47ea-98f6-70d3a42acf69', '6204cccd-7dfe-40c5-a04a-3ce211470cb0'),
	('7e04b02f-e23a-4b50-a937-cf85fb75b9b7', '0ecf6c03-d3ad-4ed6-acf9-af51eafa7c3a'),
	('7e04b02f-e23a-4b50-a937-cf85fb75b9b7', 'a5fdeede-9fb0-46dd-8a33-8bae98342f17'),
	('d26db47d-b2ea-4ffa-b178-e3cf7ae60fe4', 'f870c914-45b2-46da-b177-ad7f29089248'),
	('d26db47d-b2ea-4ffa-b178-e3cf7ae60fe4', '5ffee24e-266c-4b55-9476-1d7c69ee5702'),
	('60a8d2d8-5f45-4ee7-808e-ce52d614b4d2', '58434809-07e1-4920-b569-3d337de4bed1'),
	('60a8d2d8-5f45-4ee7-808e-ce52d614b4d2', '2d99a163-67b4-4711-8e85-a60cce584c00'),
	('843ba701-e1ee-4b5a-8a98-f38ae520df5f', '1af0a2f9-4d60-44ec-94f2-4c5d3023d802'),
	('843ba701-e1ee-4b5a-8a98-f38ae520df5f', '9cf9abe6-1302-4e12-8e5a-1c6ffda60054'),
	('9ae78fb9-c665-4957-b868-4e6974eb150a', '83489cce-50fd-4cd8-b118-44b0b25228f2'),
	('9ae78fb9-c665-4957-b868-4e6974eb150a', '81b65863-ffae-4ed0-8d17-1dd2af34849b'),
	('fe433f67-2ebe-4bbe-b6c5-a5a39de9a9c2', '83489cce-50fd-4cd8-b118-44b0b25228f2'),
	('fe433f67-2ebe-4bbe-b6c5-a5a39de9a9c2', 'b7627e86-ad66-479c-a226-5d97b2a4f73e'),
	('bc58f98c-9c67-42d3-95fe-e9cea3acebf8', '6204cccd-7dfe-40c5-a04a-3ce211470cb0'),
	('bc58f98c-9c67-42d3-95fe-e9cea3acebf8', 'b7627e86-ad66-479c-a226-5d97b2a4f73e'),
	('7d2d9d92-3c75-49cd-a008-48bf11f5bc2a', '81b65863-ffae-4ed0-8d17-1dd2af34849b'),
	('a5b9abff-6dd9-4181-ad34-f750418341a5', 'ad3808f7-a35d-400e-b8ef-8932be38b3cb'),
	('5f442049-303a-4471-8b37-5ab208104e41', '4da3be06-66f6-4ea7-954e-165eecf4736c'),
	('b241bd0f-acf5-4e7e-954e-b6c33b3ba01c', '9cf9abe6-1302-4e12-8e5a-1c6ffda60054'),
	('ac5a5cc3-1754-4f6c-97c9-19f8a50474e5', 'f870c914-45b2-46da-b177-ad7f29089248'),
	('ac5a5cc3-1754-4f6c-97c9-19f8a50474e5', '1af0a2f9-4d60-44ec-94f2-4c5d3023d802'),
	('ac5a5cc3-1754-4f6c-97c9-19f8a50474e5', '5ffee24e-266c-4b55-9476-1d7c69ee5702'),
	('c970dbad-6cfa-406a-b238-3747f0ed6ced', '6204cccd-7dfe-40c5-a04a-3ce211470cb0'),
	('8084533c-fc87-430b-b92a-dd7ac670560f', 'ad3808f7-a35d-400e-b8ef-8932be38b3cb'),
	('7661d6c0-437c-49db-89c1-cf21c31be352', '2d99a163-67b4-4711-8e85-a60cce584c00'),
	('7661d6c0-437c-49db-89c1-cf21c31be352', 'efa991e5-706f-4e7f-aaee-f6885b734ade'),
	('7661d6c0-437c-49db-89c1-cf21c31be352', 'b7627e86-ad66-479c-a226-5d97b2a4f73e'),
	('7e04b02f-e23a-4b50-a937-cf85fb75b9b7', 'f870c914-45b2-46da-b177-ad7f29089248'),
	('7e04b02f-e23a-4b50-a937-cf85fb75b9b7', '5ffee24e-266c-4b55-9476-1d7c69ee5702'),
	('04f9b8e3-305c-46db-a2a2-6317de7f2755', 'f870c914-45b2-46da-b177-ad7f29089248'),
	('8e41e466-bc92-48ad-b337-a4742474c778', '6204cccd-7dfe-40c5-a04a-3ce211470cb0'),
	('b241bd0f-acf5-4e7e-954e-b6c33b3ba01c', '58434809-07e1-4920-b569-3d337de4bed1'),
	('f06e686d-8d21-434f-9331-50ff37e4a4b1', '96fd5887-9700-4ce6-9ee1-a67f39a054b6'),
	('5d8bdfb1-4955-4285-b843-18324f0450a7', '693b0572-c6f5-4af1-a640-7c247788f621'),
	('5d8bdfb1-4955-4285-b843-18324f0450a7', '440d59b8-c1ab-4900-83c0-5c4dae94f07f'),
	('60a8d2d8-5f45-4ee7-808e-ce52d614b4d2', '9cf9abe6-1302-4e12-8e5a-1c6ffda60054'),
	('96833cd8-712b-4e0b-b6c3-52409070659d', '81b65863-ffae-4ed0-8d17-1dd2af34849b'),
	('9571c9f4-8748-43d1-bca9-446e9ac6fbf9', '91c31120-c3e0-4af0-91cb-8e578ddf9dea'),
	('52207cda-c3b8-4786-978e-14cb05d6147c', '440d59b8-c1ab-4900-83c0-5c4dae94f07f'),
	('52207cda-c3b8-4786-978e-14cb05d6147c', '0fed888b-b49d-447d-b6a2-59c0b61463f0'),
	('52207cda-c3b8-4786-978e-14cb05d6147c', '6204cccd-7dfe-40c5-a04a-3ce211470cb0'),
	('4f1ca531-3721-417b-9eb1-b8d50de9d187', '6204cccd-7dfe-40c5-a04a-3ce211470cb0');


--
-- Data for Name: saved_maps; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."saved_maps" ("id", "user_id", "map_id", "folder_id", "created_at") VALUES
	('26abd7cc-3bc7-4cd6-b413-0683e3b60d73', '8123fb92-d0e2-43d4-afd4-20f18c508206', '7e04b02f-e23a-4b50-a937-cf85fb75b9b7', NULL, '2026-04-11 00:20:48.19656+00'),
	('fa6b089c-cf9b-49a0-b7a4-807f42bef806', '8123fb92-d0e2-43d4-afd4-20f18c508206', '064e2484-f7f9-4c41-88b3-64ce969c8003', NULL, '2026-04-11 00:21:21.936006+00'),
	('418ce9c9-afa6-4a33-b073-a7863151c9fe', '8123fb92-d0e2-43d4-afd4-20f18c508206', 'b241bd0f-acf5-4e7e-954e-b6c33b3ba01c', NULL, '2026-04-11 00:23:40.238729+00'),
	('891de808-f570-4ffd-b536-88f8b76e94da', '8123fb92-d0e2-43d4-afd4-20f18c508206', '8e41e466-bc92-48ad-b337-a4742474c778', 'a0c0f2a7-a0a3-4465-8028-a1b1f115a586', '2026-04-11 03:35:48.271718+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('map-thumbnails', 'map-thumbnails', NULL, '2026-04-10 03:28:17.988119+00', '2026-04-10 03:28:17.988119+00', true, false, NULL, NULL, NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('92b4a34c-0d0f-4542-bd4c-7fd3175956cd', 'map-thumbnails', 'thumbnails/0.01843182222937534.png', NULL, '2026-04-10 03:37:31.372042+00', '2026-04-10 03:37:31.372042+00', '2026-04-10 03:37:31.372042+00', '{"eTag": "\"6e60e8e0766ab2d4fbc66df4ac098fc3\"", "size": 889609, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-10T03:37:31.368Z", "contentLength": 889609, "httpStatusCode": 200}', '92281eea-4eaf-4db9-8fcb-2e980a904305', NULL, '{}'),
	('6447e67a-5052-41cf-b51c-1d1b64ee9c4d', 'map-thumbnails', 'thumbnails/Screenshot From 2026-04-09 23-25-16.png', NULL, '2026-04-10 03:42:25.980514+00', '2026-04-10 03:42:25.980514+00', '2026-04-10 03:42:25.980514+00', '{"eTag": "\"4b249facfbfb1a3c37c4893116149c65\"", "size": 1271444, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-10T03:42:25.977Z", "contentLength": 1271444, "httpStatusCode": 200}', '531e80cb-859d-4eb4-a5c5-a55aac3d6c73', NULL, NULL),
	('204bfeb0-8573-4dfc-a16e-6436f4acf3a6', 'map-thumbnails', 'thumbnails/Affordable_housing_map.png', NULL, '2026-04-10 23:37:20.730761+00', '2026-04-10 23:37:20.730761+00', '2026-04-10 23:37:20.730761+00', '{"eTag": "\"7e9a5b29d332457d9f40e9173cbd879c\"", "size": 749747, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-10T23:37:20.728Z", "contentLength": 749747, "httpStatusCode": 200}', '6ffe7b44-97e7-45f8-8346-51aa3fb7012f', NULL, NULL),
	('1e66c359-63be-4445-a944-71c35fa53eca', 'map-thumbnails', 'thumbnails/Boundaries_nyc.png', NULL, '2026-04-10 03:32:04.069435+00', '2026-04-10 23:37:31.581169+00', '2026-04-10 03:32:04.069435+00', '{"eTag": "\"6e60e8e0766ab2d4fbc66df4ac098fc3\"", "size": 889609, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-10T23:37:31.578Z", "contentLength": 889609, "httpStatusCode": 200}', 'e7e05505-0435-43a6-a521-04bf47eb5b3e', NULL, '{}'),
	('51102fdc-ff1b-46fa-8627-c29687a3cced', 'map-thumbnails', 'thumbnails/0.6131715267187342.png', NULL, '2026-04-11 03:34:54.275899+00', '2026-04-11 03:34:54.275899+00', '2026-04-11 03:34:54.275899+00', '{"eTag": "\"6756c3104330902abdce033f690134a5\"", "size": 815723, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-11T03:34:54.272Z", "contentLength": 815723, "httpStatusCode": 200}', 'bf4546f2-936c-4bdc-bfa6-ddae17aebd35', NULL, '{}'),
	('d4c30f44-2264-4ca6-a50b-405a6ef7e7a9', 'map-thumbnails', 'thumbnails/DSNY_food_scrap_dropoff.png', NULL, '2026-04-12 04:11:37.532685+00', '2026-04-12 04:11:37.532685+00', '2026-04-12 04:11:37.532685+00', '{"eTag": "\"fa1cebdec2c0e32cf3f1eae5086ed9e0\"", "size": 2130763, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T04:11:37.526Z", "contentLength": 2130763, "httpStatusCode": 200}', 'bf5fc8c8-e58e-48f9-8de4-49740818da11', NULL, NULL),
	('2291efa1-871a-4d26-8ef5-3ac2e50c8c55', 'map-thumbnails', 'thumbnails/2021_democratic_primary.png', NULL, '2026-04-13 02:10:56.022591+00', '2026-04-13 02:10:56.022591+00', '2026-04-13 02:10:56.022591+00', '{"eTag": "\"3753190d9a47986bd0816d33714c2a5f\"", "size": 1141212, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T02:10:56.020Z", "contentLength": 1141212, "httpStatusCode": 200}', '1c54be9b-af71-47eb-b4bb-07cb2c12f087', NULL, NULL),
	('659aaafd-56df-4ae5-9a84-be2ba7531718', 'map-thumbnails', 'thumbnails/air_quality_monitoring_sites.png', NULL, '2026-04-13 02:26:44.313621+00', '2026-04-13 02:26:44.313621+00', '2026-04-13 02:26:44.313621+00', '{"eTag": "\"b23fa30f0578c6d3ab27402bcf06af2e\"", "size": 574922, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T02:26:44.309Z", "contentLength": 574922, "httpStatusCode": 200}', '5d2d6b2b-5015-4acd-a537-33c2a31b01ae', NULL, NULL),
	('960e76ed-5143-4eee-bf45-40858af0887c', 'map-thumbnails', 'thumbnails/59_community_boards.png', NULL, '2026-04-13 02:28:16.041838+00', '2026-04-13 02:28:16.041838+00', '2026-04-13 02:28:16.041838+00', '{"eTag": "\"96e68d384b925f492682989a27887e65\"", "size": 1355900, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T02:28:16.034Z", "contentLength": 1355900, "httpStatusCode": 200}', 'b05786bb-456f-483c-a624-d48699391479', NULL, NULL),
	('50fbbecc-a7a2-40b9-bae5-5252863a4871', 'map-thumbnails', 'thumbnails/DCP_community_district_profiles.png', NULL, '2026-04-13 02:38:33.260913+00', '2026-04-13 02:38:33.260913+00', '2026-04-13 02:38:33.260913+00', '{"eTag": "\"a104d81acdf1e02b3c766accdc4fc18b\"", "size": 446403, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T02:38:33.259Z", "contentLength": 446403, "httpStatusCode": 200}', '2bfe8112-b082-4e17-ba8a-0644a0d6eb57', NULL, NULL),
	('02d9db85-dc6b-48dd-a5ae-b311380b2a78', 'map-thumbnails', 'thumbnails/HPD_inclusionary_housing_sites.png', NULL, '2026-04-13 02:41:30.760515+00', '2026-04-13 02:41:30.760515+00', '2026-04-13 02:41:30.760515+00', '{"eTag": "\"6de1a7492a8dcda0c36e4059c5458445\"", "size": 1062497, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T02:41:30.758Z", "contentLength": 1062497, "httpStatusCode": 200}', '2170410c-9b68-4576-8885-6a332758c385', NULL, NULL),
	('756d81b1-9cca-4dfc-aa03-231d5e25436b', 'map-thumbnails', 'thumbnails/aptransit.png', NULL, '2026-04-13 02:46:45.049487+00', '2026-04-13 02:46:45.049487+00', '2026-04-13 02:46:45.049487+00', '{"eTag": "\"32ea6ce2c5dbb3ce6e4ddfc7b98ce01c\"", "size": 860112, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T02:46:45.046Z", "contentLength": 860112, "httpStatusCode": 200}', 'cb8adb6a-bff1-4ce2-af9d-4f5dca1aa09c', NULL, NULL),
	('25698c87-8300-4cb9-a7c2-aa98bc3c86b3', 'map-thumbnails', 'thumbnails/NYT_Mapping Segregation.png', NULL, '2026-04-13 02:51:01.383692+00', '2026-04-13 02:51:01.383692+00', '2026-04-13 02:51:01.383692+00', '{"eTag": "\"3592b69cd063a9b5b68c265c569ddcb8\"", "size": 1336999, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T02:51:01.380Z", "contentLength": 1336999, "httpStatusCode": 200}', 'd31f7702-3900-4a85-be7a-9bfefc9e6e27', NULL, NULL),
	('ad7067af-9f77-433a-a863-baadeeaa60f5', 'map-thumbnails', 'thumbnails/DCP_Metro_region_explorer.png', NULL, '2026-04-13 02:52:09.742035+00', '2026-04-13 02:52:09.742035+00', '2026-04-13 02:52:09.742035+00', '{"eTag": "\"c6e823718bff36bd2f00a5818610d6cb\"", "size": 561341, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T02:52:09.740Z", "contentLength": 561341, "httpStatusCode": 200}', '06e93f61-e852-4dc4-8a56-4884c252f844', NULL, NULL),
	('320b4c3b-cf7a-4161-a24b-a9d67308f5a2', 'map-thumbnails', 'thumbnails/NYC_Bike_Map.png', NULL, '2026-04-13 02:56:59.423161+00', '2026-04-13 02:56:59.423161+00', '2026-04-13 02:56:59.423161+00', '{"eTag": "\"81d9e7e09bd1d202fdc463767750e8f5\"", "size": 1626592, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T02:56:59.418Z", "contentLength": 1626592, "httpStatusCode": 200}', '8d904c73-77ea-418a-ba80-9ac5d92654b2', NULL, NULL),
	('af3239fd-1fcd-465c-9f47-1605cda90142', 'map-thumbnails', 'thumbnails/crash_mapper.png', NULL, '2026-04-13 03:02:13.975461+00', '2026-04-13 03:02:13.975461+00', '2026-04-13 03:02:13.975461+00', '{"eTag": "\"2625926da600b2b3236763285fc2c237\"", "size": 841552, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:02:13.973Z", "contentLength": 841552, "httpStatusCode": 200}', 'd7b5899a-0094-4523-be6c-df3536d69c1d', NULL, NULL),
	('d830217e-4314-4358-b7f5-e01471c0a0d0', 'map-thumbnails', 'thumbnails/Measure-of-America_Data2Go.png', NULL, '2026-04-13 03:04:48.741443+00', '2026-04-13 03:04:48.741443+00', '2026-04-13 03:04:48.741443+00', '{"eTag": "\"c43d23398202a6d318b6996d9db2c92b\"", "size": 408059, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:04:48.740Z", "contentLength": 408059, "httpStatusCode": 200}', 'c76b6f95-248a-412a-8103-744f811222b4', NULL, NULL),
	('2e35e581-96d2-4796-87e7-a94d7fc05a72', 'map-thumbnails', 'thumbnails/DCP_Capital-projects-portal.png', NULL, '2026-04-13 03:08:57.209422+00', '2026-04-13 03:08:57.209422+00', '2026-04-13 03:08:57.209422+00', '{"eTag": "\"d5ce45c7b5eba6dec78f5cbb6d1d57a3\"", "size": 783599, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:08:57.206Z", "contentLength": 783599, "httpStatusCode": 200}', '712444e8-42de-41eb-949f-2890b8bef666', NULL, NULL),
	('e1034ce8-a503-4241-9d62-995f99a6b414', 'map-thumbnails', 'thumbnails/DCP_flood_hazard_mapper.png', NULL, '2026-04-13 03:11:52.57428+00', '2026-04-13 03:11:52.57428+00', '2026-04-13 03:11:52.57428+00', '{"eTag": "\"ffc9226da6a75e8a10ffc2083a30c86b\"", "size": 2004883, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:11:52.570Z", "contentLength": 2004883, "httpStatusCode": 200}', '128827ea-4a73-4385-be48-ea4da984662e', NULL, NULL),
	('4cd9dcce-9e9a-428c-9633-2dc029a4068f', 'map-thumbnails', 'thumbnails/NAC_nature_map.png', NULL, '2026-04-13 03:14:14.274166+00', '2026-04-13 03:14:14.274166+00', '2026-04-13 03:14:14.274166+00', '{"eTag": "\"c1abfa53f371b53181e8aaa33fcb95e5\"", "size": 504780, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:14:14.272Z", "contentLength": 504780, "httpStatusCode": 200}', '0c5cab72-4d31-431b-9722-5409e49a8a9d', NULL, NULL),
	('65cac174-8532-453a-8a10-0a958980a548', 'map-thumbnails', 'thumbnails/DCP_Street-map.png', NULL, '2026-04-13 03:17:13.358224+00', '2026-04-13 03:17:13.358224+00', '2026-04-13 03:17:13.358224+00', '{"eTag": "\"208852273853796f4606aa6f3fb2eb1a\"", "size": 966196, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:17:13.355Z", "contentLength": 966196, "httpStatusCode": 200}', '230e37d0-2bb3-486c-a0bd-6c9fdbfe5df0', NULL, NULL),
	('7c0f7c74-8ba5-4590-b3e2-628d5e444085', 'map-thumbnails', 'thumbnails/NYC-Tree-Map.png', NULL, '2026-04-13 03:19:25.860336+00', '2026-04-13 03:19:25.860336+00', '2026-04-13 03:19:25.860336+00', '{"eTag": "\"c4a3bca21e5cbe8414567ff2555b6094\"", "size": 1213043, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:19:25.857Z", "contentLength": 1213043, "httpStatusCode": 200}', 'fa08ed16-9198-4681-9f17-e44cade76c55', NULL, NULL),
	('7517104e-b873-470e-aedc-1b168c4a5f16', 'map-thumbnails', 'thumbnails/OTI_NYCityMap.png', NULL, '2026-04-13 03:22:15.855794+00', '2026-04-13 03:22:15.855794+00', '2026-04-13 03:22:15.855794+00', '{"eTag": "\"58da2fdc81bd4221d405c4825948debe\"", "size": 510220, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:22:15.855Z", "contentLength": 510220, "httpStatusCode": 200}', '1abdfcb3-0d16-4142-b7d4-ef27cfdd77eb', NULL, NULL),
	('ac2fd6e6-3ab7-49f7-88fc-12e2fc861ed0', 'map-thumbnails', 'thumbnails/OldNYC.png', NULL, '2026-04-13 03:33:15.590819+00', '2026-04-13 03:33:15.590819+00', '2026-04-13 03:33:15.590819+00', '{"eTag": "\"f41015b2c0394a444c5520209d7d86fb\"", "size": 876972, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:33:15.587Z", "contentLength": 876972, "httpStatusCode": 200}', '42d28959-1cfc-4c51-90eb-12f82895cf3c', NULL, NULL),
	('2a14f52f-404f-452f-8051-95550a03de41', 'map-thumbnails', 'thumbnails/Open-sewer-atlas.png', NULL, '2026-04-13 03:36:14.965122+00', '2026-04-13 03:36:14.965122+00', '2026-04-13 03:36:14.965122+00', '{"eTag": "\"e711ac29c5df7b9df64432f23bf015fa\"", "size": 1319636, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:36:14.960Z", "contentLength": 1319636, "httpStatusCode": 200}', '11ebdf27-b762-44da-b8d5-fd17ebe980a4', NULL, NULL),
	('ef0899f6-9e3a-48aa-a45f-63cab369c8bd', 'map-thumbnails', 'thumbnails/DCP_population-fact-finder.png', NULL, '2026-04-13 03:41:00.57276+00', '2026-04-13 03:41:00.57276+00', '2026-04-13 03:41:00.57276+00', '{"eTag": "\"4106bc96f2d10afa6e9220114339e25a\"", "size": 1183645, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:41:00.569Z", "contentLength": 1183645, "httpStatusCode": 200}', 'bc4c30fe-b989-4fb4-8338-21dd07e85f6f', NULL, NULL),
	('fee7a65d-0238-4385-b941-10d232e2f2a2', 'map-thumbnails', 'thumbnails/sidewalk-widths.png', NULL, '2026-04-13 03:42:41.487663+00', '2026-04-13 03:42:41.487663+00', '2026-04-13 03:42:41.487663+00', '{"eTag": "\"c4342d47c982797176057d476918b1c7\"", "size": 1604371, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:42:41.483Z", "contentLength": 1604371, "httpStatusCode": 200}', 'f5e15f92-b983-4ad5-a2ab-508067ef0df0', NULL, NULL),
	('77e76049-f3a8-4343-a50f-dddb25671859', 'map-thumbnails', 'thumbnails/pizza-map.png', NULL, '2026-04-13 03:49:12.038986+00', '2026-04-13 03:49:12.038986+00', '2026-04-13 03:49:12.038986+00', '{"eTag": "\"6dd8fe95a5b037b5e4a2ad83dae1db74\"", "size": 122625, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:49:12.037Z", "contentLength": 122625, "httpStatusCode": 200}', 'bf9c9a82-3e94-430e-aceb-7252351e52d6', NULL, NULL),
	('539fd0ca-a086-4587-97e9-147071789895', 'map-thumbnails', 'thumbnails/DCP_waterfront-access-map.png', NULL, '2026-04-13 03:50:48.530349+00', '2026-04-13 03:50:48.530349+00', '2026-04-13 03:50:48.530349+00', '{"eTag": "\"9725b2ec81190b9dc7afab079621539d\"", "size": 738158, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:50:48.528Z", "contentLength": 738158, "httpStatusCode": 200}', '69388619-0881-44c8-a95e-96b87944fb9a', NULL, NULL),
	('65849139-3a89-4f10-a754-b70dba52f1de', 'map-thumbnails', 'thumbnails/Welikia.png', NULL, '2026-04-13 03:51:59.736842+00', '2026-04-13 03:51:59.736842+00', '2026-04-13 03:51:59.736842+00', '{"eTag": "\"fb076b8cf9a09d45f14ee5613aa49ce1\"", "size": 1528447, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:51:59.734Z", "contentLength": 1528447, "httpStatusCode": 200}', 'f9e0d795-02fa-4f81-94f7-40aab2241931', NULL, NULL),
	('85ed9220-a4f0-4af8-86d6-aaca2947579d', 'map-thumbnails', 'thumbnails/DCP_zoning-index-map.png', NULL, '2026-04-13 03:52:51.137693+00', '2026-04-13 03:52:51.137693+00', '2026-04-13 03:52:51.137693+00', '{"eTag": "\"09b61d400c0fd96fc3520efe49018e5a\"", "size": 657738, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T03:52:51.135Z", "contentLength": 657738, "httpStatusCode": 200}', '09ee45ed-76b3-44a7-a0e5-ed30ea9c3907', NULL, NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- PostgreSQL database dump complete
--

-- \unrestrict gY9enLy6alESNHsm1uUiegVC7cHNXVHt2CpjN8qZD4LOZmvb5zcAWKNc2gOZ4Yr

RESET ALL;
