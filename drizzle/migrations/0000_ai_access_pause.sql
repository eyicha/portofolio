CREATE TABLE public.ai_access_pause (id text PRIMARY KEY, status integer NOT NULL, message text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.ai_access_pause TO service_role;
ALTER TABLE public.ai_access_pause ENABLE ROW LEVEL SECURITY;