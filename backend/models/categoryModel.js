import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    image: {type: String, required: true},
    
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
