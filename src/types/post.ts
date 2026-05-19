export interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  status: 'active' | 'inactive';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDto {
  title: string;
  description: string;
  author: string;
  status?: 'active' | 'inactive';
}

export interface UpdatePostDto {
  title?: string;
  description?: string;
  author?: string;
  status?: 'active' | 'inactive';
}