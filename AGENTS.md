<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep home and project detail routes on TanStack Router to preserve platform routing.
- Use MixedTitle for title typography and shared illustration wrappers for artwork so lettering and image replacements stay consistent.
- Contact success animation must follow a confirmed email send; until sender setup is complete, submission retains input and reports failure. Inquiry AI uses a validated public server function without storing letter content.
- Persist terminal AI access pauses server-side and do not automatically retry them, preventing repeat blocked requests across reloads.
- Hero-to-About river uses a dedicated bounded decorative gutter with scroll position updated through animation frames, preventing artwork from crossing into text.
- Shortened storybook replay uses an explicit event without changing first-visit session behavior.
