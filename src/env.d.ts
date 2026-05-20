/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CONTACT_FROM_EMAIL?: string;
  readonly CONTACT_TO_EMAIL?: string;
  readonly RESEND_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
