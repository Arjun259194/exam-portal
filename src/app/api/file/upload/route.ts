import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) return NextResponse.json({ success: false }, { status: 200 });

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const path = join(__dirname, "tmp", file.name);
  await writeFile(path, buffer);

  return NextResponse.json({ success: true }, { status: 200 });
}
