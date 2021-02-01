import DateTimeFormat = Intl.DateTimeFormat;

export interface User {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
  createdAt: DateTimeFormat;
  updatedAt: DateTimeFormat;
}
