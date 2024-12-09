interface User {
  username: string;
  _id: string;
}
export interface Post {
  id: string;
  likes: string[];
  text: string;
  userId: User;
  theme: string;
}
