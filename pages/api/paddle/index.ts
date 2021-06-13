import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { query } = req;
  const passthrough = JSON.parse(query.passthrough);

  const result = await prisma.purchasedCourse.create({
    data: {
      user: { connect: { id: passthrough.user as number } },
      strapiCourseId: Number(passthrough.strapiCourseId),
    },
  });
  res.status(200).send({ result });
}
