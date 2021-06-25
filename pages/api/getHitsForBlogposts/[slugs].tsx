import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { slugs } = req.query;
  const usedSlugs = slugs.split(",");

  const result = await Promise.all(
    usedSlugs.map(async (slug) => {
      const hitsByBlogpost = await prisma.blogpostHit.findMany({
        where: {
          slug,
        },
      });
      return { [slug]: hitsByBlogpost.length };
    })
  );

  res.status(200).json({ result });
}
