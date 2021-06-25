import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { slug } = req.body;

  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  const result = await prisma.blogpostHit.upsert({
    where: {
      ip_slug: { ip: ip, slug: slug },
    },
    update: {
      slug: slug,
    },
    create: {
      slug: slug,
      ip: ip,
    },
  });
  res.status(200).send({ result });
}
