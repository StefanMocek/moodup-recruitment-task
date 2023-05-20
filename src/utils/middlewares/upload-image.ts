import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksymalny rozmiar pliku: 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      // req.uploaderError = new Error(`we only accept these types: ${types}`)
      return cb(null, false)
    }
  },
});