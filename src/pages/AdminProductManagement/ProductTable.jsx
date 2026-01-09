const ProductTable = ({ products, onEdit }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#1F2937] text-gray-300 uppercase">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">Expiry</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Currency</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700 bg-[#111827]">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-[#1F2937]">
              <td className="px-4 py-3 font-medium">{product.title}</td>
              <td className="px-4 py-3">{product.brand}</td>
              <td className="px-4 py-3">{product.expiry}</td>
              <td className="px-4 py-3">${product.price}</td>
              <td className="px-4 py-3">{product.currency}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    product.isDeleted
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {product.isDeleted ? "Deleted" : "Active"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
