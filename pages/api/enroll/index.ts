import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handle(req, res) {
  const { strapiCourseId } = req.body;

  const session = await getSession({ req });
  const result = await prisma.enrolment.create({
    data: {
      user: { connect: { id: session.id as number } },
      strapiCourseId: Number(strapiCourseId),
    },
  });
  res.status(200).send({ result });
}
