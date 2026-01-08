import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ENDPOINTS } from "../constants/backend_urls";

export default function() {
    const [productDetail, setProductDetail] = useState(null)
    const params = useParams()

    async function getSingleProduct() {
        const productId = params.productId;

        const details = await axios.get(ENDPOINTS.product.user.getProductById + '/' + productId);
        setProductDetail(details);
    }

    useEffect(() => {
        getSingleProduct();
    }, []);

    return <>
        {JSON.stringify(productDetail)}
        <br/>
        product...
        <br/>
        {JSON.stringify(params)}
    </>
}