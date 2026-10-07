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

## Application rules
- Keep the uploaded salon landing page at `/` and its content in `src/lib/salon.ts`; this preserves the imported presentation and WhatsApp request flow.
- Use asset pointer JSON for imported salon photography; this keeps uploaded media out of source-controlled binaries.
- Use the shared Button salon variants for landing-page controls; this preserves the salon design consistently.
- Keep testimonials explicitly identified when fictional and store verified sources alongside real reviews; this avoids misleading customer attribution.
