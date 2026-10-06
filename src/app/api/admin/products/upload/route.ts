import { NextResponse, type NextRequest } from "next/server";
import { withAdmin } from "@/server/auth";
import { db } from "@/server/db";
import { randomBytes } from "node:crypto";

export const POST = withAdmin(async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["png", "jpg", "jpeg"].includes(ext || "")) {
      return NextResponse.json({ error: "Invalid file type. Only PNG and JPG are allowed." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const fileName = `${randomBytes(16).toString("hex")}.${ext}`;
    
    const { data, error } = await db()
      .storage
      .from("thumbnails")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      throw new Error(`Storage upload failed: ${error.message}`);
    }

    // Return the public URL for the uploaded file
    const { data: { publicUrl } } = db()
      .storage
      .from("thumbnails")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl, path: fileName });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
});
