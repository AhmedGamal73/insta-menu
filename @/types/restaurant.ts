export interface Branch {
  title: string;
  _id: string;
  id: string;
  name: string;
  distance?: string;
  walkTime: string;
  image: string;
  address?: string;
}

export interface BranchItemProps {
  branch: Branch;
  isLast: boolean;
}
