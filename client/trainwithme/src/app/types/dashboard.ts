export interface DashboardData {
  themes: string[];
  posts: string[];
  _id: string;
  type: string;
  email: string;
  username: string;
  password: string;
  imageUrl: string;
  bio: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface DashboardArticles {
  subscribers: string[];
  posts: string[];
  _id: string;
  themeName: string;
  userId: string;
  created_at: string;
  updatedAt: string;
  imageUrl: string;
}
