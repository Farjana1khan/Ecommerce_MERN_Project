const express = require("express")

const {
    getAllProducts,
     createProduct,
      updateProduct, 
      deleteProduct,
       getProductDetails,
        createProductReview, 
        getProductReviews,
         deleteProductReview,
         getAdminProducts
        } = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router()

//Get All Product API
router.route("/products").get(  getAllProducts);

//Get Admin Products
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

//Get Product detail By Id API
router.route("/product/:id").get(getProductDetails)

//Create Product API
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

//Update Product By Id API
router.route("/admin/product/:id").put(isAuthenticatedUser , authorizeRoles("admin"), updateProduct)

//Delete Product By ID API
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)


//Product Review create OR update By Id
router.route("/review/update").put(isAuthenticatedUser, createProductReview)


//Get All Reviews
router.route("/reviews").get( getProductReviews)

router.route("/review/delete").delete(isAuthenticatedUser, deleteProductReview)





module.exports = router;