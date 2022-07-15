export type OrderT = {
  client: string;
  address: string;
  comments: string;
  phone: string;
  store: string;
  images: string[];
  status: string;
};

export type UserT = {
  accessToken?: string | unknown;
  address: string;
  email: string;
  id: string | unknown;
  image: string;
  isNewUser?: boolean | unknown;
  name: string;
  orders?: any[];
  phone: string;
  tokenType?: string | unknown;
};
