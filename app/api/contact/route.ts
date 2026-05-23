import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !phone || !message) {
      return Response.json(
        { error: "Нэр, утас, зурвас заавал бөглөнө үү." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        "Khumug Mining <onboarding@resend.dev>",

      to: [process.env.CONTACT_TO_EMAIL || "info@khumug.mn"],

      replyTo: email || undefined,

      subject: `Шинэ хүсэлт: ${service || "Website Contact Form"}`,

      html: `
        <div>
          <h2>Шинэ хүсэлт</h2>

          <p><strong>Нэр:</strong> ${name}</p>
          <p><strong>Утас:</strong> ${phone}</p>
          <p><strong>Имэйл:</strong> ${email}</p>
          <p><strong>Үйлчилгээ:</strong> ${service}</p>

          <hr />

          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json(
      { error: "Илгээх үед алдаа гарлаа." },
      { status: 500 }
    );
  }
}