import prisma from "lib/prisma";
import { getSession } from "next-auth/client";

export default async function handle(req, res) {
  const { strapiVideoId } = req.body;

  const session = await getSession({ req });
  const result = await prisma.watchedVideo.create({
    data: {
      user: { connect: { id: session.id as number } },
      strapiVideoId: Number(strapiVideoId),
    },
  });
  res.status(200).json({ result });
}
