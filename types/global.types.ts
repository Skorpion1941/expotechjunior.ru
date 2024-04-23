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
  id?: number;
  createdAt?: string;
  name: string;
  city: string;
}
export interface Project {
  id?: number;
  createdAt?: string;
  name: string;
  team: any;
  description: string;
  tilda_url: string;
  title_photo: string;
  direction_id: number;
  user_id?: string;
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
export interface Schedule {
  id?: number;
  createdAt?: string;
  date: string;
  time: string;
}
export interface Assessment {
  id?: number;
  createdAt?: string;
  response: any;
  score: number;
  score_max: number;
  comment: string;
  project: string;
  fio_expert: string;
}
export interface Form {
  id?: number;
  createdAt?: string;
  direction_id: number;
  url_form: string;
}
