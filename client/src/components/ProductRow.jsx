function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>₹{product.price}</td>
      <td>{product.category}</td>
      <td>
        <img src={product.imageUrl} alt={product.name} className="admin-product-thumb" />
      </td>
      <td>
        <button onClick={onEdit} className="admin-btn edit">Edit</button>
        <button onClick={onDelete} className="admin-btn delete">Delete</button>
      </td>
    </tr>
  );
}

export default ProductRow;
