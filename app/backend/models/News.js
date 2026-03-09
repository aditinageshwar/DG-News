import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['National', 'Politics', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health', 'World']
  },
  author: {
    type: String,
    required: true
  },
  authorAvatar: {
    type: String,
    default: ''
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String,
    default: '5 min'
  },
  isBreaking: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  location: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for search
newsSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

const News = mongoose.model('News', newsSchema);
export default News;
