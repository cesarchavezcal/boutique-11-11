export type OrderT = {
  id: string;
  client: string;
  address: string;
  comments: string;
  phone: string;
  store: string;
  images: string[];
  status: string;
  cost: number;
};

export type UserT = {
  accessToken?: string | unknown;
  address: string;
  email: string;
  id: string | unknown;
  image: string;
  isNewUser?: boolean | unknown;
  name: string;
  orders?: OrderT[];
  phone: string;
  tokenType?: string | unknown;
};
