
  create table "public"."folders" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "name" text not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
      );



  create table "public"."map_themes" (
    "map_id" uuid not null,
    "theme_id" uuid not null
      );


alter table "public"."map_themes" enable row level security;


  create table "public"."maps" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "url" text not null,
    "author" text,
    "description" text,
    "publication_date" text,
    "data_sources" text,
    "last_updated" text,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "image_url" text,
    "approved" boolean default false,
    "submitted_by" uuid
      );


alter table "public"."maps" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "email" text,
    "username" text,
    "submission_count" integer default 0
      );



  create table "public"."saved_maps" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "map_id" uuid not null,
    "folder_id" uuid,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
      );



  create table "public"."themes" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
      );


CREATE UNIQUE INDEX map_themes_pkey ON public.map_themes USING btree (map_id, theme_id);

CREATE UNIQUE INDEX maps_pkey ON public.maps USING btree (id);

CREATE UNIQUE INDEX maps_url_key ON public.maps USING btree (url);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX saved_maps_pkey ON public.saved_maps USING btree (id);

CREATE UNIQUE INDEX themes_name_key ON public.themes USING btree (name);

CREATE UNIQUE INDEX themes_pkey ON public.themes USING btree (id);

CREATE UNIQUE INDEX user_folders_pkey ON public.folders USING btree (id);

alter table "public"."folders" add constraint "user_folders_pkey" PRIMARY KEY using index "user_folders_pkey";

alter table "public"."map_themes" add constraint "map_themes_pkey" PRIMARY KEY using index "map_themes_pkey";

alter table "public"."maps" add constraint "maps_pkey" PRIMARY KEY using index "maps_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."saved_maps" add constraint "saved_maps_pkey" PRIMARY KEY using index "saved_maps_pkey";

alter table "public"."themes" add constraint "themes_pkey" PRIMARY KEY using index "themes_pkey";

alter table "public"."map_themes" add constraint "map_themes_map_id_fkey" FOREIGN KEY (map_id) REFERENCES public.maps(id) ON DELETE CASCADE not valid;

alter table "public"."map_themes" validate constraint "map_themes_map_id_fkey";

alter table "public"."map_themes" add constraint "map_themes_theme_id_fkey" FOREIGN KEY (theme_id) REFERENCES public.themes(id) ON DELETE CASCADE not valid;

alter table "public"."map_themes" validate constraint "map_themes_theme_id_fkey";

alter table "public"."maps" add constraint "maps_submitted_by_fkey" FOREIGN KEY (submitted_by) REFERENCES public.profiles(id) not valid;

alter table "public"."maps" validate constraint "maps_submitted_by_fkey";

alter table "public"."maps" add constraint "maps_url_key" UNIQUE using index "maps_url_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."saved_maps" add constraint "saved_maps_folder_id_fkey" FOREIGN KEY (folder_id) REFERENCES public.folders(id) ON DELETE SET NULL not valid;

alter table "public"."saved_maps" validate constraint "saved_maps_folder_id_fkey";

alter table "public"."saved_maps" add constraint "saved_maps_map_id_fkey" FOREIGN KEY (map_id) REFERENCES public.maps(id) ON DELETE CASCADE not valid;

alter table "public"."saved_maps" validate constraint "saved_maps_map_id_fkey";

alter table "public"."saved_maps" add constraint "saved_maps_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."saved_maps" validate constraint "saved_maps_user_id_fkey";

alter table "public"."themes" add constraint "themes_name_key" UNIQUE using index "themes_name_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, username, submission_count)
  VALUES (NEW.id, NEW.email, split_part(NEW.email, '@', 1), 0);
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."folders" to "anon";

grant insert on table "public"."folders" to "anon";

grant references on table "public"."folders" to "anon";

grant select on table "public"."folders" to "anon";

grant trigger on table "public"."folders" to "anon";

grant truncate on table "public"."folders" to "anon";

grant update on table "public"."folders" to "anon";

grant delete on table "public"."folders" to "authenticated";

grant insert on table "public"."folders" to "authenticated";

grant references on table "public"."folders" to "authenticated";

grant select on table "public"."folders" to "authenticated";

grant trigger on table "public"."folders" to "authenticated";

grant truncate on table "public"."folders" to "authenticated";

grant update on table "public"."folders" to "authenticated";

grant delete on table "public"."folders" to "service_role";

grant insert on table "public"."folders" to "service_role";

grant references on table "public"."folders" to "service_role";

grant select on table "public"."folders" to "service_role";

grant trigger on table "public"."folders" to "service_role";

grant truncate on table "public"."folders" to "service_role";

grant update on table "public"."folders" to "service_role";

grant delete on table "public"."map_themes" to "anon";

grant insert on table "public"."map_themes" to "anon";

grant references on table "public"."map_themes" to "anon";

grant select on table "public"."map_themes" to "anon";

grant trigger on table "public"."map_themes" to "anon";

grant truncate on table "public"."map_themes" to "anon";

grant update on table "public"."map_themes" to "anon";

grant delete on table "public"."map_themes" to "authenticated";

grant insert on table "public"."map_themes" to "authenticated";

grant references on table "public"."map_themes" to "authenticated";

grant select on table "public"."map_themes" to "authenticated";

grant trigger on table "public"."map_themes" to "authenticated";

grant truncate on table "public"."map_themes" to "authenticated";

grant update on table "public"."map_themes" to "authenticated";

grant delete on table "public"."map_themes" to "service_role";

grant insert on table "public"."map_themes" to "service_role";

grant references on table "public"."map_themes" to "service_role";

grant select on table "public"."map_themes" to "service_role";

grant trigger on table "public"."map_themes" to "service_role";

grant truncate on table "public"."map_themes" to "service_role";

grant update on table "public"."map_themes" to "service_role";

grant delete on table "public"."maps" to "anon";

grant insert on table "public"."maps" to "anon";

grant references on table "public"."maps" to "anon";

grant select on table "public"."maps" to "anon";

grant trigger on table "public"."maps" to "anon";

grant truncate on table "public"."maps" to "anon";

grant update on table "public"."maps" to "anon";

grant delete on table "public"."maps" to "authenticated";

grant insert on table "public"."maps" to "authenticated";

grant references on table "public"."maps" to "authenticated";

grant select on table "public"."maps" to "authenticated";

grant trigger on table "public"."maps" to "authenticated";

grant truncate on table "public"."maps" to "authenticated";

grant update on table "public"."maps" to "authenticated";

grant delete on table "public"."maps" to "service_role";

grant insert on table "public"."maps" to "service_role";

grant references on table "public"."maps" to "service_role";

grant select on table "public"."maps" to "service_role";

grant trigger on table "public"."maps" to "service_role";

grant truncate on table "public"."maps" to "service_role";

grant update on table "public"."maps" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."saved_maps" to "anon";

grant insert on table "public"."saved_maps" to "anon";

grant references on table "public"."saved_maps" to "anon";

grant select on table "public"."saved_maps" to "anon";

grant trigger on table "public"."saved_maps" to "anon";

grant truncate on table "public"."saved_maps" to "anon";

grant update on table "public"."saved_maps" to "anon";

grant delete on table "public"."saved_maps" to "authenticated";

grant insert on table "public"."saved_maps" to "authenticated";

grant references on table "public"."saved_maps" to "authenticated";

grant select on table "public"."saved_maps" to "authenticated";

grant trigger on table "public"."saved_maps" to "authenticated";

grant truncate on table "public"."saved_maps" to "authenticated";

grant update on table "public"."saved_maps" to "authenticated";

grant delete on table "public"."saved_maps" to "service_role";

grant insert on table "public"."saved_maps" to "service_role";

grant references on table "public"."saved_maps" to "service_role";

grant select on table "public"."saved_maps" to "service_role";

grant trigger on table "public"."saved_maps" to "service_role";

grant truncate on table "public"."saved_maps" to "service_role";

grant update on table "public"."saved_maps" to "service_role";

grant delete on table "public"."themes" to "anon";

grant insert on table "public"."themes" to "anon";

grant references on table "public"."themes" to "anon";

grant select on table "public"."themes" to "anon";

grant trigger on table "public"."themes" to "anon";

grant truncate on table "public"."themes" to "anon";

grant update on table "public"."themes" to "anon";

grant delete on table "public"."themes" to "authenticated";

grant insert on table "public"."themes" to "authenticated";

grant references on table "public"."themes" to "authenticated";

grant select on table "public"."themes" to "authenticated";

grant trigger on table "public"."themes" to "authenticated";

grant truncate on table "public"."themes" to "authenticated";

grant update on table "public"."themes" to "authenticated";

grant delete on table "public"."themes" to "service_role";

grant insert on table "public"."themes" to "service_role";

grant references on table "public"."themes" to "service_role";

grant select on table "public"."themes" to "service_role";

grant trigger on table "public"."themes" to "service_role";

grant truncate on table "public"."themes" to "service_role";

grant update on table "public"."themes" to "service_role";


  create policy "Anyone can link themes"
  on "public"."map_themes"
  as permissive
  for insert
  to public
with check (true);



  create policy "Public can read themes"
  on "public"."map_themes"
  as permissive
  for select
  to public
using (true);



  create policy "Anyone can submit a map"
  on "public"."maps"
  as permissive
  for insert
  to public
with check (true);



  create policy "Only admin can delete maps"
  on "public"."maps"
  as permissive
  for delete
  to authenticated
using (((auth.jwt() ->> 'email'::text) = 'bahijnyc@gmail.com'::text));



  create policy "Only admin can update maps"
  on "public"."maps"
  as permissive
  for update
  to authenticated
using (((auth.jwt() ->> 'email'::text) = 'bahijnyc@gmail.com'::text))
with check (((auth.jwt() ->> 'email'::text) = 'bahijnyc@gmail.com'::text));



  create policy "Public can view approved, Admin can view all"
  on "public"."maps"
  as permissive
  for select
  to public
using (((approved = true) OR ((auth.jwt() ->> 'email'::text) = 'bahijnyc@gmail.com'::text) OR ((auth.uid() IS NOT NULL) AND (submitted_by = auth.uid())) OR ((auth.uid() IS NULL) AND (submitted_by IS NULL))));


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "Allow Uploads"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check ((bucket_id = 'map-thumbnails'::text));



  create policy "Public Access"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'map-thumbnails'::text));



