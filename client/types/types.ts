export type Job = {
  _id: string;
  title: string;
  location: string;
  description: string;
  salary: number;
  createdBy: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  applicants: string[];
  jobType: string[];
  createdAt: string;
  salaryType: string;
  negotiable: boolean;
  tags: string[];
  likes: string[];
};