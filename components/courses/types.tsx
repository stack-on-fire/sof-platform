export type Course = {
  id: number;
  title: string;
  description: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  slug: string;
  author: Author;
  cover: Image;
  modules: [Module];
};

export type Author = {
  id: number;
  name: string;
  profileImage: Image;
};

export type Image = {
  url: string;
};

export type Module = {
  id: number;
  title: string;
  description: string;
  slug: string;
  videos: [Video];
};

export type Video = {
  title: string;
  slug: string;
  videoFile: VideoFile;
};

export type VideoFile = {
  url: string;
};
