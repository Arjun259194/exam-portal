import { prisma } from "@/database";
import { getSessionUser } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const s = z.object({
  questions: z
    .array(
      z.object({
        question: z.string(),
        marks: z.number(),
      }),
    )
    .min(1),
  releaseDate: z.coerce.date(),
  withholdDate: z.coerce.date(),
  title: z.string(),
  subject: z.string(),
});

export async function POST(req: NextRequest) {
  const user = await getSessionUser();

  if (user.type !== "TEACHER") {
    return NextResponse.json({}, { status: 401 });
  }

  const json = await req.json();

  console.log(json);
  const parsedObj = s.safeParse(json);

  if (!parsedObj.success) {
    return NextResponse.json({}, { status: 400 });
  }

  const { data } = parsedObj;

  const { questions, ...d } = data;

  const res = await prisma.writtenTest.create({
    data: {
      releaseAt: d.releaseDate,
      withholdAt: d.withholdDate,
      title: d.title,
      subject: d.subject,
      createrId: user.id,
    },
  });

  Promise.all(
    questions.map(
      async (q) =>
        await prisma.writtenQuenstion.create({
          data: {
            ...q,
            test: {
              connect: { id: res.id },
            },
          },
        }),
    ),
  );
  return NextResponse.json({}, { status: 200 });
}
