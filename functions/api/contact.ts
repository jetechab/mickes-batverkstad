import { z } from "zod";

type Env = {
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type PagesContext = {
  env: Env;
  request: Request;
};

const payloadSchema = z
  .object({
    source: z.enum(["quick-book", "full-book"]),
    name: z.string().trim().min(2, "Skriv ditt namn."),
    phone: z
      .string()
      .trim()
      .regex(/^[0-9+()\-\s]{6,}$/, "Ange ett giltigt telefonnummer."),
    email: z
      .union([z.literal(""), z.string().trim().email("Ange en giltig e-postadress.")])
      .optional()
      .default(""),
    service: z.string().trim().max(120).optional().default(""),
    boatModel: z.string().trim().max(120).optional().default(""),
    engine: z.string().trim().max(120).optional().default(""),
    location: z.string().trim().max(120).optional().default(""),
    preferredDate: z.string().trim().max(40).optional().default(""),
    message: z.string().trim().min(2, "Skriv kort vad det gäller.").max(2000),
    website: z.string().max(0).optional().default(""),
    turnstileToken: z.string().max(4000).optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.source === "full-book" && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "E-post krävs för fullständig bokning.",
        path: ["email"],
      });
    }
  });

type Payload = z.infer<typeof payloadSchema>;

function jsonResponse(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildOwnerTextEmail(data: Payload) {
  return [
    `Ny förfrågan från batverkstad.se (${data.source === "quick-book" ? "snabbokning" : "fullständig bokning"})`,
    "",
    `Namn: ${data.name}`,
    `Telefon: ${data.phone}`,
    `E-post: ${data.email || "Ej angiven"}`,
    `Tjänst: ${data.service || "Ej vald"}`,
    `Båtmodell: ${data.boatModel || "Ej angiven"}`,
    `Motor: ${data.engine || "Ej angiven"}`,
    `Plats: ${data.location || "Ej angiven"}`,
    `Önskat datum: ${data.preferredDate || "Ej angivet"}`,
    "",
    "Meddelande:",
    data.message,
  ].join("\n");
}

function buildOwnerHtmlEmail(data: Payload) {
  const rows: [string, string][] = [
    ["Namn", data.name],
    ["Telefon", data.phone],
    ["E-post", data.email || "Ej angiven"],
    ["Tjänst", data.service || "Ej vald"],
    ["Båtmodell", data.boatModel || "Ej angiven"],
    ["Motor", data.engine || "Ej angiven"],
    ["Plats", data.location || "Ej angiven"],
    ["Önskat datum", data.preferredDate || "Ej angivet"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#0a1924;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#334155;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f1ea;padding:24px;color:#0a1924;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d4b985;border-radius:18px;overflow:hidden;">
        <div style="padding:24px 28px;background:#0a1924;color:#f5f1ea;">
          <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#5ec3d6;">Ny förfrågan</p>
          <h1 style="margin:0;font-size:24px;line-height:1.2;">${data.source === "quick-book" ? "Snabbokning" : "Bokningsförfrågan"} från batverkstad.se</h1>
        </div>
        <div style="padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
          <div style="margin-top:24px;padding:18px 20px;border-radius:14px;background:#f5f1ea;border:1px solid #d4b985;">
            <p style="margin:0 0 10px 0;font-size:13px;font-weight:700;color:#0a1924;">Meddelande</p>
            <p style="margin:0;font-size:15px;line-height:1.65;color:#334155;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
          ${
            data.email
              ? `<p style="margin:18px 0 0 0;font-size:13px;color:#64748b;">Svara direkt på det här mailet för att kontakta ${escapeHtml(data.name)}.</p>`
              : ""
          }
        </div>
      </div>
    </div>`;
}

function buildCustomerTextEmail(data: Payload) {
  return [
    `Hej ${data.name}!`,
    "",
    "Tack för din förfrågan till Priox Båtverkstad. Vi har tagit emot ditt meddelande och återkommer så snart vi kan, oftast samma dag på vardagar.",
    "",
    "Här är en sammanfattning av vad du skickade:",
    "",
    data.service ? `Tjänst: ${data.service}` : "",
    data.boatModel ? `Båtmodell: ${data.boatModel}` : "",
    data.engine ? `Motor: ${data.engine}` : "",
    data.location ? `Plats: ${data.location}` : "",
    data.preferredDate ? `Önskat datum: ${data.preferredDate}` : "",
    "",
    "Meddelande:",
    data.message,
    "",
    "Behöver du nå oss direkt, ring 0767-16 67 16 eller maila mickes@batverkstad.se.",
    "",
    "Hälsningar",
    "Micke",
    "Priox Båtverkstad, en verksamhet inom PRIOX AB",
    "Box 6, 457 02 Grebbestad",
    "batverkstad.se",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildCustomerHtmlEmail(data: Payload) {
  const detailRows: [string, string][] = [
    ["Tjänst", data.service],
    ["Båtmodell", data.boatModel],
    ["Motor", data.engine],
    ["Plats", data.location],
    ["Önskat datum", data.preferredDate],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  const rows = detailRows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 0;font-size:13px;color:#64748b;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;font-size:14px;color:#0a1924;font-weight:500;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f1ea;padding:32px 16px;color:#0a1924;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2d5b8;border-radius:20px;overflow:hidden;box-shadow:0 6px 24px rgba(10,25,36,0.06);">
        <div style="padding:32px 32px 24px;background:linear-gradient(135deg,#0a1924,#122638);color:#f5f1ea;">
          <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5ec3d6;font-weight:700;">Priox Båtverkstad</p>
          <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;">Tack för din förfrågan, ${escapeHtml(data.name)}!</h1>
        </div>
        <div style="padding:28px 32px;">
          <p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;color:#334155;">
            Vi har tagit emot ditt meddelande och återkommer så snart vi kan, oftast samma dag på vardagar.
          </p>
          <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#334155;">
            Behöver du svar direkt, ring oss på <a href="tel:+46767166716" style="color:#0a6378;font-weight:600;text-decoration:none;">0767-16 67 16</a>.
          </p>

          ${
            rows
              ? `
            <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:8px;">
              <p style="margin:0 0 12px 0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;color:#64748b;">Din förfrågan</p>
              <table style="width:100%;border-collapse:collapse;">${rows}</table>
            </div>`
              : ""
          }

          <div style="margin-top:24px;padding:18px 20px;border-radius:14px;background:#f5f1ea;border:1px solid #e2d5b8;">
            <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;color:#0a1924;">Ditt meddelande</p>
            <p style="margin:0;font-size:14px;line-height:1.65;color:#334155;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
        </div>
        <div style="padding:20px 32px 28px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.6;">
          <p style="margin:0 0 4px 0;font-weight:700;color:#0a1924;">Priox Båtverkstad</p>
          <p style="margin:0 0 4px 0;">En verksamhet inom PRIOX AB · Tidigare Mickes Båtverkstad</p>
          <p style="margin:0;">Box 6, 457 02 Grebbestad · godkänd för F-skatt</p>
          <p style="margin:8px 0 0 0;">
            <a href="https://batverkstad.se" style="color:#0a6378;text-decoration:none;">batverkstad.se</a>
            ·
            <a href="mailto:mickes@batverkstad.se" style="color:#0a6378;text-decoration:none;">mickes@batverkstad.se</a>
          </p>
        </div>
      </div>
    </div>`;
}

async function sendViaResend(
  apiKey: string,
  payload: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    replyTo?: string;
  },
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: [payload.to],
      subject: payload.subject,
      reply_to: payload.replyTo,
      text: payload.text,
      html: payload.html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend request failed: ${errorText}`);
  }
}

export async function onRequestPost(context: PagesContext) {
  try {
    const { env, request } = context;

    const rawBody = await request.json();
    const parsed = payloadSchema.safeParse(rawBody);

    if (!parsed.success) {
      return jsonResponse(
        { error: parsed.error.issues[0]?.message ?? "Kontrollera formuläret." },
        400,
      );
    }

    if (parsed.data.website) {
      return jsonResponse({ message: "Tack, vi hör av oss!" }, 200);
    }

    // Turnstile-verifiering, aktiv först när hemligheten är satt i Cloudflare
    if (env.TURNSTILE_SECRET_KEY) {
      const verification = (await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: env.TURNSTILE_SECRET_KEY,
            response: parsed.data.turnstileToken,
            remoteip: request.headers.get("CF-Connecting-IP") ?? undefined,
          }),
        },
      ).then((r) => r.json())) as { success?: boolean };

      if (!verification.success) {
        return jsonResponse(
          {
            error:
              "Robotkontrollen gick inte igenom. Ladda om sidan och försök igen, eller ring 0767-16 67 16.",
          },
          400,
        );
      }
    }

    if (
      !env.RESEND_API_KEY ||
      !env.CONTACT_TO_EMAIL ||
      !env.CONTACT_FROM_EMAIL
    ) {
      console.log("Form submission (no email backend configured)", parsed.data);
      return jsonResponse(
        {
          error:
            "Formuläret är inte färdigkonfigurerat ännu. Ring 0767-16 67 16 så hjälper vi dig direkt.",
        },
        503,
      );
    }

    const data = parsed.data;

    await sendViaResend(env.RESEND_API_KEY, {
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      subject: `Ny förfrågan: ${data.service || data.name}`,
      text: buildOwnerTextEmail(data),
      html: buildOwnerHtmlEmail(data),
      replyTo: data.email || undefined,
    });

    if (data.email) {
      try {
        await sendViaResend(env.RESEND_API_KEY, {
          from: env.CONTACT_FROM_EMAIL,
          to: data.email,
          subject: "Tack för din förfrågan – Priox Båtverkstad",
          text: buildCustomerTextEmail(data),
          html: buildCustomerHtmlEmail(data),
          replyTo: env.CONTACT_TO_EMAIL,
        });
      } catch (confirmError) {
        console.error("Customer confirmation failed", confirmError);
      }
    }

    return jsonResponse({ message: "Tack, vi hör av oss!" }, 200);
  } catch (error) {
    console.error("Contact form submission failed", error);
    return jsonResponse(
      {
        error:
          "Något gick fel när vi skulle skicka. Försök igen eller ring 0767-16 67 16.",
      },
      500,
    );
  }
}
