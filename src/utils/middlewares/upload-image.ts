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
      req.uploaderError = new Error('We only accept these types: jpeg/jpg')
      return cb(null, false)
    }
  },
});