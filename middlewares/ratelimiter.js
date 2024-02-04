const rateLimitMiddleware = (options) => {
    const { windowMs = 60 * 1000, max = 3, message = 'Too many requests, please try again later.' } = options;
  
    let requestQueue = [];
  
    return (req, res, next) => {
      const currentTime = Date.now();
  
      // Remove requests outside the current window
      requestQueue = requestQueue.filter((timestamp) => timestamp > currentTime - windowMs);
  
      if (requestQueue.length >= max) {
        console.log(`Rate limit exceeded for IP: ${req.ip}`);
        return res.status(429).json({ error: message });
      }
  
      requestQueue.push(currentTime);
      console.log(`Request added to the queue. New queue: ${JSON.stringify(requestQueue)}`);
      next();
    };
  };
  
  module.exports = rateLimitMiddleware;
  