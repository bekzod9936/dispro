export interface IBadge {
  histories?: IBadgeHistory[];
  totalCount?: number;
}
export interface IBProps {
  badge?: IBadge;
}
export interface IBadgeHistory {
  chatType: number;
  date: string;
  firstName: string;
  id: number;
  image: string;
  lastMsg: string | number;
  lastName: string;
}
export interface IProps {
  balance?: number;
  limit?: number;
  badge?: IBadge;
}
