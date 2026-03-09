import express from 'express';
import News from '../models/News.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get all news with filters
router.get('/', async (req, res) => {
  try {
    const { category, location, search, isBreaking, isFeatured, sortBy } = req.query;
    let query = {};

    if (category && category !== 'all') query.category = category;
    if (location && location !== 'all') query.location = location;
    if (isBreaking) query.isBreaking = isBreaking === 'true';
    if (isFeatured) query.isFeatured = isFeatured === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    let sortOption = {};
    if (sortBy === 'popular') {
      sortOption = { views: -1 };
    } else {
      sortOption = { publishedAt: -1 };
    }

    const news = await News.find(query).sort(sortOption);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get breaking news
router.get('/breaking', async (req, res) => {
  try {
    const news = await News.find({ isBreaking: true }).sort({ publishedAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured news
router.get('/featured', async (req, res) => {
  try {
    const news = await News.find({ isFeatured: true }).sort({ publishedAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single news by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    // Increment views
    news.views += 1;
    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create news
router.post('/', [
  body('title').notEmpty().trim(),
  body('excerpt').notEmpty(),
  body('content').notEmpty(),
  body('category').notEmpty(),
  body('author').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update news
router.put('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete news
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
