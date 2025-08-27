const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // good for SEO-friendly URLs
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 300, // good for meta description
    },
    content: {
      type: String,
      required: true, // full blog content
    },
    featuredImage: {
      type: String, // main blog image (for OG + SEO)
    },
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String, // for SEO keywords
        trim: true,
      },
    ],

    seo: {
      title: { type: String }, // custom SEO title
      description: { type: String }, // custom SEO meta desc
      keywords: [{ type: String }], // SEO keywords
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0, // track popularity
    },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
