import axios from 'axios';
import type { CreatePostDto, UpdatePostDto } from '../types/post';

const API_URL = `${import.meta.env.VITE_API_URL}/posts`;

export const postsService = {
  getAll: async (): Promise<CreatePostDto[]> => {
    const { data } = await axios.get(API_URL);
    return data;
  },

  getById: async (id: string): Promise<CreatePostDto> => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  },

  create: async (post: CreatePostDto): Promise<CreatePostDto> => {
    const { data } = await axios.post(API_URL, post);
    return data;
  },

  update: async (id: string, post: UpdatePostDto): Promise<CreatePostDto> => {
    const { data } = await axios.put(`${API_URL}/${id}`, post);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};