

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(400).send("Invalid token.");
    }
  };
  
  const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).send("Access denied. Admin role required.");
    }
    next();
  };
  
  const isFarmer = (req, res, next) => {
    if (req.user.role !== "farmer") {
      return res.status(403).send("Access denied. Farmer role required.");
    }
    next();
  };
  
  const isBuyer = (req, res, next) => {
    if (req.user.role !== "buyer") {
      return res.status(403).send("Access denied. Buyer role required.");
    }
    next();
  };

  const isDelivery = (req, res, next) => {
    if (req.user.role !== "delivery") {
      return res.status(403).send("Access denied. Delivery role required.");
    }
    next();
  };

  const isExpert = (req, res, next) => {
    if (req.user.role !== "expert") {
      return res.status(403).send("Access denied. Expert role required.");
    }
    next();
  };

  module.exports = { authenticate, isAdmin, isBuyer, isFarmer, isDelivery, isExpert };
