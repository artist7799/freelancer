import { Calendar, User, Clock } from 'lucide-react';
import type { Blog } from '../../types';

interface BlogCardProps {
  blog: Blog;
  onReadMore?: (blog: Blog) => void;
}

export const BlogCard = ({ blog, onReadMore }: BlogCardProps) => {
  return (
    <div className="glass glass-hover rounded-2xl overflow-hidden flex flex-col group h-full">
      {/* Cover Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
        />
        {/* Category tag overlay */}
        <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-secondary/95 text-[10px] font-bold text-white uppercase tracking-wider">
          {blog.category}
        </div>
      </div>

      {/* Article Info */}
      <div className="p-5 flex-1 flex flex-col gap-3.5">
        {/* Meta Stats */}
        <div className="flex items-center gap-3 text-xs text-app-muted border-b border-app-border/40 pb-2.5">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-secondary" />
            {blog.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            {blog.readTime}
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display font-bold text-base text-app-text leading-tight group-hover:text-secondary transition-colors duration-300">
            {blog.title}
          </h3>
          <p className="text-xs text-app-muted line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        {/* Date and Action */}
        <div className="mt-auto pt-3 border-t border-app-border/40 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-app-muted">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <button
            onClick={() => onReadMore?.(blog)}
            className="font-semibold text-secondary hover:text-secondary-hover transition-colors"
          >
            Read Article
          </button>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
