import { Request, Response, NextFunction } from 'express';
import { Blog } from '../models/Blog';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { uploadImage } from '../services/cloudinaryService';

export const getAllBlogs = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const query: any = {};

  if (req.query.search) {
    const searchVal = String(req.query.search);
    query.$or = [
      { title: { $regex: searchVal, $options: 'i' } },
      { content: { $regex: searchVal, $options: 'i' } },
      { excerpt: { $regex: searchVal, $options: 'i' } },
      { author: { $regex: searchVal, $options: 'i' } },
    ];
  }

  if (req.query.category) {
    query.category = { $regex: `^${req.query.category}$`, $options: 'i' };
  }

  const blogs = await Blog.find(query).sort({ publishedAt: -1 });

  const formattedBlogs = blogs.map(blog => ({
    id: blog.slug, // Frontend expects slug as id
    title: blog.title,
    category: blog.category,
    date: blog.publishedAt.toISOString().split('T')[0],
    author: blog.author,
    image: blog.image,
    excerpt: blog.excerpt,
    content: blog.content,
    readTime: blog.readTime,
  }));

  res.status(200).json({
    status: 'success',
    results: formattedBlogs.length,
    data: {
      blogs: formattedBlogs,
    },
  });
});

export const getBlogBySlugOrId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { idOrSlug } = req.params;

  let blog = await Blog.findOne({ slug: idOrSlug });

  if (!blog && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await Blog.findById(idOrSlug);
  }

  if (!blog) {
    return next(new AppError('Blog post not found', 404));
  }

  const formattedBlog = {
    id: blog.slug,
    title: blog.title,
    category: blog.category,
    date: blog.publishedAt.toISOString().split('T')[0],
    author: blog.author,
    image: blog.image,
    excerpt: blog.excerpt,
    content: blog.content,
    readTime: blog.readTime,
  };

  res.status(200).json({
    status: 'success',
    data: {
      blog: formattedBlog,
    },
  });
});

export const createBlog = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  let imageUrl = '';
  if (req.file) {
    imageUrl = await uploadImage(req.file);
  }

  const blog = await Blog.create({
    ...req.body,
    image: imageUrl || req.body.image,
  });

  res.status(201).json({
    status: 'success',
    message: 'Blog created successfully',
    data: {
      blog,
    },
  });
});

export const updateBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    return next(new AppError('Blog post not found', 404));
  }

  let imageUrl = blog.image;
  if (req.file) {
    imageUrl = await uploadImage(req.file);
  }

  Object.assign(blog, req.body);
  blog.image = imageUrl;
  await blog.save();

  res.status(200).json({
    status: 'success',
    message: 'Blog updated successfully',
    data: {
      blog,
    },
  });
});

export const deleteBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return next(new AppError('Blog post not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Blog deleted successfully',
  });
});
