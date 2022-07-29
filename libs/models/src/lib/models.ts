export type OrderT = {
  address: string;
  client: string;
  comments: string;
  cost?: number;
  coupon?: string;
  id: string;
  images: string[];
  payment?: number;
  phone: string;
  status: string;
  store: string;
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
