import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "RESEND_API_KEY тохируулаагүй байна." },
        { status: 500 }
      );
    }

console.log("API KEY:", process.env.RESEND_API_KEY);
console.log("FROM:", process.env.CONTACT_FROM_EMAIL);
console.log("TO:", process.env.CONTACT_TO_EMAIL);

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
      console.error("RESEND ERROR:", JSON.stringify(error, null, 2));

      return Response.json(
        {
          error: JSON.stringify(error),
        },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Khumug Mining <info@khumug.mn>",
      to: [email],
      subject: "Таны хүсэлтийг хүлээн авлаа",
      html: `
        <h2>Таны хүсэлтийг хүлээн авлаа</h2>
        <p>Сайн байна уу, ${name}.</p>
        <p>Хөмөг Майнинг ХХК-д хандсанд баярлалаа.</p>
        <p>Бид таны илгээсэн хүсэлтийг хүлээн авлаа. Манай баг удахгүй тантай холбогдох болно.</p>
        <br />
        <p><strong>Таны илгээсэн мэдээлэл:</strong></p>
        <p>Үйлчилгээ: ${service || "Сонгоогүй"}</p>
        <p>Утас: ${phone}</p>
        <p>Зурвас: ${message}</p>
        <br />
        <p>Хүндэтгэсэн,<br />Хөмөг Майнинг ХХК</p>
      `,
    });
    return Response.json({ success: true, data });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}