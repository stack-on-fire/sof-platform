import { rest } from "msw";

const sessionMock = {
  expires: "1",
  user: {
    email: "alpha@me.com",
    name: "Alpha",
    image: null,
    createdAt: "2021-06-30T14:39:05.904Z",
  },
};
const videosMock = {
  id: 1,
  strapiVideoId: 5,
  userId: 1,
  watchedAt: "2021-06-30T18:13:48.050Z",
  test: 123,
};

const coursesMock = {
  enrolmentsByUser: [
    { id: 1, strapiCourseId: 3, isPurchased: false, userId: 1 },
    { id: 2, strapiCourseId: 3, isPurchased: false, userId: 1 },
  ],
};

const purchasesMock = { purchasesByUser: [] };

export const handlers = [
  rest.get("/api/auth/session", (req, res, ctx) => {
    return res(ctx.json(sessionMock));
  }),
  rest.get("/api/videos", (req, res, ctx) => {
    return res(ctx.json(videosMock));
  }),
  rest.get("/api/courses", (req, res, ctx) => {
    return res(ctx.json(coursesMock));
  }),
  rest.get("/api/purchases", (req, res, ctx) => {
    return res(ctx.json(purchasesMock));
  }),
];
