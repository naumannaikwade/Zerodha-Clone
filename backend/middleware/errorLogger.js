// middleware/errorLogger.js
const errorLogger = (err, req, res, next) => {
  console.error('Error occurred:');
  console.error('Timestamp:', new Date().toISOString());
  console.error('URL:', req.url);
  console.error('Method:', req.method);
  console.error('Headers:', req.headers);
  console.error('Body:', req.body);
  console.error('Error Stack:', err.stack);
  console.error('-------------------------------');
  next(err);
};

module.exports = errorLogger;