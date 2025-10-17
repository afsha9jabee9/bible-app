const express = require("express");
const router = express.Router();

// In-memory data store (resets on server restart)
let verses = [
  { id: 1, book: "John", chapter: 3, verse: 16, text: "For God so loved the world..." },
  { id: 2, book: "Psalm", chapter: 23, verse: 1, text: "The Lord is my shepherd..." },
  { id: 3, book: "Proverbs", chapter: 3, verse: 5, text: "Trust in the Lord with all your heart..." }
];

// -------------------- GET all verses --------------------
router.get("/", (req, res) => {
  res.json(verses);
});

// -------------------- POST a new verse --------------------
router.post("/", (req, res) => {
  const { book, chapter, verse, text } = req.body;
  if (!book || !chapter || !verse || !text) {
    return res.status(400).json({ error: "book, chapter, verse and text are required" });
  }

  const newId = verses.length ? Math.max(...verses.map(v => v.id)) + 1 : 1;
  const newVerse = {
    id: newId,
    book,
    chapter: Number(chapter),
    verse: Number(verse),
    text
  };

  verses.push(newVerse);
  return res.status(201).json(newVerse);
});

// -------------------- PUT (update) a verse --------------------
router.put("/:id", (req, res) => {
  const verseId = Number(req.params.id);
  const { book, chapter, verse, text } = req.body;

  const index = verses.findIndex(v => v.id === verseId);
  if (index === -1) {
    return res.status(404).json({ error: "Verse not found" });
  }

  if (book) verses[index].book = book;
  if (chapter) verses[index].chapter = Number(chapter);
  if (verse) verses[index].verse = Number(verse);
  if (text) verses[index].text = text;

  return res.json(verses[index]);
});

// -------------------- DELETE a verse --------------------
router.delete("/:id", (req, res) => {
  const verseId = Number(req.params.id);
  const index = verses.findIndex(v => v.id === verseId);

  if (index === -1) {
    return res.status(404).json({ error: "Verse not found" });
  }

  const removed = verses.splice(index, 1);
  return res.json({ message: "Verse deleted", removed: removed[0] });
});

module.exports = router;



