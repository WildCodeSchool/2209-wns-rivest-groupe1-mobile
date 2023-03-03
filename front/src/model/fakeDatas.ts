import { Article, User } from './models';

export const users: User[] = [
  {
    id: 1,
    pseudo: 'test1',
    email: 'test1@test.com',
    password: 'pass1',
    description: 'description1',
    avatar: 'test1',
    blogId: 9999999,
  },
  {
    id: 2,
    pseudo: 'test2',
    email: 'test2@test.com',
    password: 'pass2',
    description: 'description2',
    avatar: 'test2',
    blogId: 9999999,
  },
  {
    id: 3,
    pseudo: 'test3',
    email: 'test3@test.com',
    password: 'pass3',
    description: 'description3',
    avatar: 'test3',
    blogId: 9999999,
  },
  {
    id: 4,
    pseudo: 'test4',
    email: 'test4@test.com',
    password: 'pass4',
    description: 'description4',
    avatar: 'test4',
    blogId: 9999999,
  },
  {
    id: 5,
    pseudo: 'test5',
    email: 'test5@test.com',
    password: 'pass5',
    description: 'description5',
    avatar: 'test5',
    blogId: 9999999,
  },
];

export const articles: Article[] = [
  {
    id: 1,
    label: 'label1',
    content: 'content1',
    createdAt: Date.now(),
    publishedAt: null,
    updatedAt: null,
    isPublished: false,
    userId: 2,
  },
  {
    id: 2,
    label: 'label2',
    content: 'content2',
    createdAt: Date.now(),
    publishedAt: null,
    updatedAt: null,
    isPublished: false,
    userId: 5,
  },
  {
    id: 3,
    label: 'label3',
    content: 'content3',
    createdAt: Date.now(),
    publishedAt: 4556,
    updatedAt: null,
    isPublished: true,
    userId: 1,
  },
  {
    id: 4,
    label: 'label4',
    content: 'content4',
    createdAt: Date.now(),
    publishedAt: null,
    updatedAt: null,
    isPublished: false,
    userId: 1,
  },
  {
    id: 5,
    label: 'label5',
    content: 'content5',
    createdAt: Date.now(),
    publishedAt: 123456,
    updatedAt: 851443,
    isPublished: true,
    userId: 4,
  },
];
