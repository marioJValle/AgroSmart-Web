// src/presentation/components/usuarios/SearchBar.jsx
const SearchBar = ({ onSearch, placeholder }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || 'Buscar...'}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
