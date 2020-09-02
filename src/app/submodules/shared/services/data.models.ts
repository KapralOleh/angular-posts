export interface IUser  {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IUserAdress;
  phone: string;
  website: string;
  company: IUserCompany;
  posts?: IPost[];
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  userName?: string;
  comments?: IComment[];
}

export interface IComment  {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface IUserAdress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface IUserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
