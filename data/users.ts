export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password?: string; // Stored to check against login credentials
  role: "admin" | "user";
  joinDate: string;
}

// Pre-registered users (with default password: "Password123!")
export const usersDatabase: UserRecord[] = [
  {
    id: "admin-1",
    name: "Head Admin",
    email: "admin@fashionhub.com",
    password: "Password123!",
    role: "admin",
    joinDate: "2026-01-01",
  },
  {
    id: "user-1",
    name: "Amit Sharma",
    email: "amit@gmail.com",
    password: "Password123!",
    role: "user",
    joinDate: "2026-01-15",
  },
  {
    id: "user-2",
    name: "Priya Patel",
    email: "priya@yahoo.com",
    password: "Password123!",
    role: "user",
    joinDate: "2026-03-22",
  },
];
