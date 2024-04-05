import { prisma } from "@/database";
import { newTypingTestReq } from "@/lib/schema";
import { getSessionUser } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getSessionUser();

  if (user.type !== "TEACHER") {
    return NextResponse.json({}, { status: 401 });
  }

  const json = await req.json();


  console.log(json)
  const parsedObj = newTypingTestReq.safeParse(json);

  if (!parsedObj.success) {
    return NextResponse.json({}, { status: 400 });
  }

  const { data } = parsedObj;

  const { questions, ...d } = data;

  const res = await prisma.typingTest.create({
    data: {
      releaseAt: d.releaseDate,
      withholdAt: d.withholdDate,
      title: d.title,
      subject: d.subject,
      createrId: user.id
    },
  });

  Promise.all(
    questions.map(
      async (q) =>
        await prisma.typingQuestions.create({
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
