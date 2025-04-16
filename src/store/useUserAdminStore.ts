import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserAdminStore {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  deleting: boolean;
  showDeleteModal: boolean;
  deleteUserId: string | null;
  setShowDeleteModal: (show: boolean) => void;
  setDeleteUserId: (id: string | null) => void;
  fetchUsers: () => Promise<void>;
  createUser: (userData: { email: string; password: string }) => Promise<void>;
  updateUser: (id: string, userData: { name: string; email: string; phoneNumber: string; address: string }) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  confirmDeleteUser: () => Promise<void>;
  filterUsers: (filters: { name: string; role: string; isVerified: string }) => void;
}

export const useUserAdminStore = create<UserAdminStore>((set, get) => ({
  users: [],
  filteredUsers: [],
  loading: false,
  deleting: false,
  showDeleteModal: false,
  deleteUserId: null,

  setShowDeleteModal: (show: boolean) => set({ showDeleteModal: show }),

  setDeleteUserId: (id: string | null) => set({ deleteUserId: id }),

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/auth/users");
      const fetchedUsers = Array.isArray(response.data) ? response.data : [];
      set({ users: fetchedUsers, filteredUsers: fetchedUsers });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to fetch users");
    } finally {
      set({ loading: false });
    }
  },

  createUser: async (userData: { email: string; password: string }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      set((state) => ({
        users: [...state.users, response.data],
        filteredUsers: [...state.filteredUsers, response.data],
      }));
      toast.success("User created successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to create user");
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (id: string, userData: { name: string; email: string; phoneNumber: string; address: string }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/auth/users/${id}`, userData);
      set((state) => ({
        users: state.users.map((user) => (user._id === id ? response.data : user)),
        filteredUsers: state.filteredUsers.map((user) => (user._id === id ? response.data : user)),
      }));
      toast.success("User updated successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to update user");
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id: string) => {
    set({ deleting: true });
    try {
      await axiosInstance.delete(`/auth/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
        filteredUsers: state.filteredUsers.filter((user) => user._id !== id),
      }));
      toast.success("User deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to delete user");
      throw error;
    } finally {
      set({ deleting: false });
    }
  },

  confirmDeleteUser: async () => {
    const { deleteUserId, deleteUser } = get();
    if (deleteUserId) {
      await deleteUser(deleteUserId);
      set({ showDeleteModal: false, deleteUserId: null });
    }
  },

  filterUsers: (filters: { name: string; role: string; isVerified: string }) => {
    const { users } = get();
    let tempUsers = [...users];

    if (filters.name) {
      tempUsers = tempUsers.filter((user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filter by role: empty role ("") means include both "admin" and "customer"
    if (filters.role) {
      tempUsers = tempUsers.filter((user) => user.role === filters.role);
    } else {
      tempUsers = tempUsers.filter((user) => user.role === "admin" || user.role === "customer");
    }

    if (filters.isVerified !== "") {
      const isVerified = filters.isVerified === "true";
      tempUsers = tempUsers.filter((user) => user.isVerified === isVerified);
    }

    set({ filteredUsers: tempUsers });
  },
}));