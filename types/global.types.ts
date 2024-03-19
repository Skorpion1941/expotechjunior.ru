export interface IBaseField {
  id: string;
  createdAt: string;
}
export interface Organization {
  id: string;
  createdAt: string;
  name: string;
  city: string;
}
export interface Project {
  id: string;
  createdAt: string;
  name: string;
  team: any;
  tilda_url: string;
  title_photo: string;
  user_id: string;
  result_evaluation?: any;
}
export interface Direction {
  id: number;
  createdAt: string;
  name: string;
  short_name: string;
  description: string;
  color: string;
}
