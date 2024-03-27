export default function (req, res, next) {
  if (req.isAuthenticated()) {
   res.redirect("/products");
  } else {
    next();
  }
}

  