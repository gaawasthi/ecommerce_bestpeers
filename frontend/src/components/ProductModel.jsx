import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProductModal = ({ isOpen, onClose, onSubmit, initialData, sellerId }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      description: "",
      color: "",
      stock: "",
      brand: "",
      images: [],
      seller: sellerId || "",   
      ...initialData,
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Product name is required")
        .min(3, "Name must be at least 3 characters"),
      category: Yup.string()
        .required("Category is required")
        .min(3, "Category must be at least 3 characters"),
      description: Yup.string()
        .required("Description is required")
        .min(3, "Description must be at least 3 characters"),
      color: Yup.string().required("Color is required"),
      brand: Yup.string().nullable(),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      stock: Yup.number()
        .required("Stock is required")
        .min(0, "Stock cannot be negative"),
    }),

    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-lg my-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          {initialData ? "Update Product" : "Add Product"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
       
          <div>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Product Name"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              placeholder="Category"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.category && formik.touched.category && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                placeholder="Price"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.price && formik.touched.price && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
              )}
            </div>

            <div>
              <input
                name="stock"
                type="number"
                value={formik.values.stock}
                onChange={formik.handleChange}
                placeholder="Stock"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.stock && formik.touched.stock && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.stock}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                placeholder="Color"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.color && formik.touched.color && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.color}</p>
              )}
            </div>

            <div>
              <input
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                placeholder="Brand (optional)"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Description"
              rows="4"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={(e) => {
                formik.setFieldValue("images", Array.from(e.target.files));
              }}
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {initialData ? "Update" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;