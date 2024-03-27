export interface IBaseField {
  id: string;
  createdAt: string;
}
export interface Profile {
  id: string;
  createdAt: string;
  name: string;
  surname: string;
  patronymic: string | undefined;
  avatar_url: string | undefined;
  post: string;
  about_me: string | undefined;
  directions: any | undefined;
  organization_id: number;
  role: string;
}

export interface Organization {
  id?: string;
  createdAt?: string;
  name: string;
  city: string;
}
export interface Project {
  id?: number;
  createdAt?: string;
  name: string;
  team: any;
  tilda_url: string;
  title_photo: string;
  direction_id: number;
  user_id: string;
  result_evaluation?: any;
}
export interface Direction {
  id?: number;
  createdAt?: string;
  name: string;
  short_name: string;
  description: string;
  color: string;
}
export interface Role {
  id?: number;
  createdAt?: string;
  name: string;
  code: string;
}
