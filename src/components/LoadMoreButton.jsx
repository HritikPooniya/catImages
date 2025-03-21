const LoadMoreButton = ({ onClick }) => {
    return (
      <button onClick={onClick} className="mt-4 p-2 bg-blue-500 text-white rounded" style={{fontSize:'18px',backgroundColor:'grey',color:'white',border:'none',padding:'5px',marginLeft:'auto',display:'flex',marginBottom:'20px'}}>Load More ... </button>
    );
  };
  
  export default LoadMoreButton;