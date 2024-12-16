export interface Subscriber {
  _id: string;
}

export interface User {
  themes: string[];
  posts: string[];
  _id: string;
  type: string;
  email: string;
  username: string;
  password: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface Post {
  likes: string[];
  _id: string;
  text: string;
  userId: User;
  themeId: Theme;
  created_at: string;
  updatedAt: string;
  __v: number;
}
//add here new Theme features
export interface Theme {
  subscribers: string[];
  posts: Post[];
  _id: string;
  themeName: string;
  imageUrl: string;
  articleData: string;
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface Article {
  _id: string;
  createdBy: string;
  subscribers: string[];
  title: string;
  imageUrl: string;
  placement: string;
  articleContent: string;
}
