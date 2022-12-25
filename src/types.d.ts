export interface ContactItem {
  id: string;
  name: string;
  image: string;
}

export interface FullContactInfo extends ContactItem {
  phone: string;
  email: string;
}

export type ApiContactItem = Omit<FullContactInfo, 'id'>;

export interface ApiContactsList {
  [id: string]: ApiContactItem;
}