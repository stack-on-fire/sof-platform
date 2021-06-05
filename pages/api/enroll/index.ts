import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handle(req, res) {
  const { strapiCourseId } = req.body;

  const session = await getSession({ req });
  const result = await prisma.course.create({
    data: {
      user: { connect: { id: session.id as number } },
      strapiCourseId: Number(strapiCourseId),
    },
  });
  console.log(result);
  res.json(123);
}
