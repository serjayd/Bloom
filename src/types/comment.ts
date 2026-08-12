export type TComment = {
  postId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  authorId: string;
  author: {
    image: string | null;
    name: string;
    id: string;
  };
};
