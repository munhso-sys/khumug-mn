import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "RESEND_API_KEY тохируулаагүй байна." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
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
        "Khumug Mining <info@khumug.mn>",
      to: [process.env.CONTACT_TO_EMAIL || "info@khumug.mn"],
      replyTo: email || undefined,
      subject: `khumug.mn - Шинэ хүсэлт: ${name}`,
      html: `
        <h2>khumug.mn сайтаас шинэ хүсэлт ирлээ</h2>
        <p><strong>Нэр:</strong> ${name}</p>
        <p><strong>Утас:</strong> ${phone}</p>
        <p><strong>И-мэйл:</strong> ${email || "Оруулаагүй"}</p>
        <p><strong>Үйлчилгээ:</strong> ${service || "Сонгоогүй"}</p>
        <p><strong>Зурвас:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch {
    return Response.json(
      { error: "Илгээх үед алдаа гарлаа." },
      { status: 500 }
    );
  }
}