import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ENDPOINTS } from "../constants/backend_urls";
import { getToken } from "../utils/localStorage";
import PriceHistoryChart from "../components/charts/PriceHistoryChart";

export default function() {
    const [productDetail, setProductDetail] = useState(null)
    const params = useParams()

    async function getSingleProduct() {
        const productId = params.productId;

        const details = await axios.get(ENDPOINTS.product.user.getProductById + '/' + productId, {
            headers: { Authorization: `Bearer ${getToken()}`}
        });
        
        setProductDetail(details.data.data);
    }

    useEffect(() => {
        getSingleProduct();
    }, []);

    return (
  <>
    {JSON.stringify(productDetail)}
    <br />
    product...
    <br />
    {JSON.stringify(params)}

    {productDetail?.priceHistory?.length ? (
      <PriceHistoryChart priceHistory={productDetail.priceHistory} />
    ) : (
      <div className="mt-4 h-[350px] flex items-center justify-center rounded-xl bg-gray-900 text-gray-400 text-sm">
        No price history available for this product.
      </div>
    )}
  </>
);

}