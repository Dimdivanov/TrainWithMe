export interface Trainer {
  _id: {
    $oid: string;
  };
  themes: Array<{
    $oid: string;
  }>;
  posts: Array<{
    $oid: string;
  }>;
  tel: string;
  email: string;
  username: string;
  password: string;
  created_at: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
}
