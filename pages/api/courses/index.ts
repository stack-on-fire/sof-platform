import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handle(req, res) {
  const session = await getSession({ req });
  const userId = session.id;

  const enrolmentsByUser = await prisma.enrolment.findMany({
    where: {
      userId,
    },
  });

  res.status(200).json({ enrolmentsByUser });
}
