// rateLimitMiddleware.js

const rateLimitMiddleware = (options) => {
    const { windowMs = 60 * 1000, max = 3, message = 'Too many requests, please try again later.' } = options;
  
    const requestQueue = new Map();
  
    return (req, res, next) => {
      const ip = req.ip; // You may need to adjust this depending on your proxy setup
  
      if (!requestQueue.has(ip)) {
        requestQueue.set(ip, []);
      }
  
      const userRequests = requestQueue.get(ip);
      const currentTime = Date.now();
      const windowStart = currentTime - windowMs;
  
      // Remove requests outside the current window
      requestQueue.set(ip, userRequests.filter((timestamp) => timestamp > windowStart));
  
      if (userRequests.length >= max) {
        return res.status(429).json({ error: message });
      }
  
      userRequests.push(currentTime);
      next();
    };
  };
  
  module.exports = rateLimitMiddleware;
  