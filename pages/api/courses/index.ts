import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handle(req, res) {
  const session = await getSession({ req });
  const userId = session.id;

  const coursesByUser = await prisma.course.findMany({
    where: {
      userId,
    },
  });
  console.log(coursesByUser);

  res.status(200).json({ coursesByUser });
}
