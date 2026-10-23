CREATE TABLE public.letter_send_limits (
  visitor_hash text PRIMARY KEY CHECK (visitor_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz NOT NULL,
  send_count integer NOT NULL CHECK (send_count > 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.letter_send_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.letter_send_limits FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.letter_send_limits TO service_role;

CREATE OR REPLACE FUNCTION public.claim_letter_send(
  p_visitor_hash text,
  p_max_sends integer,
  p_window_seconds integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_now timestamptz := clock_timestamp();
  v_limit public.letter_send_limits%ROWTYPE;
BEGIN
  IF p_visitor_hash !~ '^[0-9a-f]{64}$'
    OR p_max_sends < 1
    OR p_max_sends > 20
    OR p_window_seconds < 1
    OR p_window_seconds > 86400 THEN
    RETURN false;
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended(p_visitor_hash, 0));

  SELECT * INTO v_limit
  FROM public.letter_send_limits
  WHERE visitor_hash = p_visitor_hash
  FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO public.letter_send_limits (visitor_hash, window_started_at, send_count, updated_at)
    VALUES (p_visitor_hash, v_now, 1, v_now);
    RETURN true;
  END IF;

  IF v_limit.window_started_at <= v_now - make_interval(secs => p_window_seconds) THEN
    UPDATE public.letter_send_limits
    SET window_started_at = v_now, send_count = 1, updated_at = v_now
    WHERE visitor_hash = p_visitor_hash;
    RETURN true;
  END IF;

  IF v_limit.send_count >= p_max_sends THEN
    RETURN false;
  END IF;

  UPDATE public.letter_send_limits
  SET send_count = send_count + 1, updated_at = v_now
  WHERE visitor_hash = p_visitor_hash;
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_letter_send(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_letter_send(text, integer, integer) TO service_role;