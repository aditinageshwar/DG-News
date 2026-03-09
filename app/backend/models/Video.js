import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: '0:00'
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
  publishedAt: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
