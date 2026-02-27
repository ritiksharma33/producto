import { useNavigate, useParams, Link } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  //getting the auth fatures 
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

const { data, isLoading } = useProduct(id);
const product = data?.product;

//this line is mismatching the request and response 
  //const { data: product, isLoading } = useProduct(id);
  //calling the hook which needs id as the field
  const updateProduct = useUpdateProduct();

  if (isLoading) return <LoadingSpinner />;

console.log("FULL product object:", product);
console.log("product.userId:", product?.userId);
console.log("product.user?.id:", product?.user?.id);
console.log("Logged in userId:", userId);


//if user not realted to product go home 
  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">{!product ? "Not found" : "Access denied"}</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }



//on submit we are mutating the data in the using the hook in databse to the product update route 
  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id, ...formData },
          {//on success take to product details page 
            onSuccess: () => navigate(`/product/${id}`),
          }
        );
      }}
    />
  );
}

export default EditProductPage;