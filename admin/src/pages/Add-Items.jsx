import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CATEGORIES = ["Salad","Rolls","Deserts","Sandwich","Cake","Pure-Veg","Pasta","Noodles","Burger"];

const AddItems = ({ url }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", description: "", category: "Salad", price: "" });

  const collect = (e) => setData(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image");
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, k === "price" ? Number(v) : v));
      fd.append("image", image);
      const res = await axios.post(`${url}/api/food/add`, fd);
      if (res.data.succeeded) {
        toast.success("Food item added successfully!");
        setData({ name: "", description: "", category: "Salad", price: "" });
        setImage(null);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 fadeInUp">
          <h1 className="text-3xl font-black text-gray-800 mb-1">Add New Item</h1>
          <p className="text-gray-500">Fill in the details to add a new food item to the menu</p>
        </div>

        <form onSubmit={submit} className="space-y-6 fadeInUp">
          {/* Image Upload */}
          <div className="card p-6">
            <label className="block text-sm font-bold text-gray-700 mb-4">Product Image</label>
            <label className="cursor-pointer block">
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="hidden" />
              <div className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 overflow-hidden ${
                image ? "border-[#ff6b6b] bg-red-50" : "border-gray-300 hover:border-[#ff6b6b] hover:bg-red-50 h-48"
              }`}>
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="preview" className="w-full max-h-64 object-cover rounded-2xl" />
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">Click to upload image</p>
                    <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </label>
            {image && (
              <button type="button" onClick={() => setImage(null)} className="mt-3 text-sm text-red-500 hover:text-red-700 font-medium">
                Remove image
              </button>
            )}
          </div>

          {/* Details */}
          <div className="card p-6 space-y-5">
            <h2 className="font-bold text-gray-800 text-lg">Product Details</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Product Name</label>
              <input
                required name="name" value={data.name} onChange={collect}
                placeholder="e.g. Margherita Pizza"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Description</label>
              <textarea
                required name="description" value={data.description} onChange={collect}
                rows={4} placeholder="Describe the dish..."
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Category</label>
                <select
                  name="category" value={data.category} onChange={collect}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Price ($)</label>
                <input
                  required type="number" name="price" value={data.price} onChange={collect}
                  placeholder="0.00" min="0" step="0.01"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="btn-primary w-full text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
                Add Food Item
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
