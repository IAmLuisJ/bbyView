import { useLoaderData, Form, ActionFunction, redirect, LoaderFunction } from "remix"
import { createSearchQuery } from "~/api/bestbuy";

export const action: ActionFunction = async ({ request }) => {
    let form = await request.formData();
    const SKU = await form.get("SKU");
    return redirect(`/products/${SKU}`);
}

export const loader: LoaderFunction = async () => {
    //get a collection
    //d
    const url = createSearchQuery("Appliances");
    let response = await fetch(url);
    console.log(response);
    return await response.json();
}

export type Product = {
    SKU: number;
    itemName: string;
    price: number;
    imageLink: string;
}

export type Product2 = {
    name: string;
    salePrice: number;
    sku: number;

}

export default function Products() {
    const products = useLoaderData();
    const productList = products.products;
    const renderedList = productList.map((product: Product2) => {
        return (
            <div className="rounded overflow-hidden shadow-lg" key={product.sku}>
                {/* <img className="w-full" alt="product picture" src={product.imageLink} /> */}
                <div className="px-6 py-4">
                    <a href={`/products/${product.sku}`}><div className="font-bold text-xl mb-2">{product.name}</div></a>
                    <p className="text-grey-700 text-base">SKU: {product.sku}</p>
                    <p>Price: {product.salePrice}</p>
                </div>
            </div>)
    });

    return (<div className="p-10">
        <div className="p-10">
            <Form method="post" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="lock text-gray-700 text-sm font-bold mb-2">Search By SKU</label>
                <input type="text" name="SKU" placeholder="SKU" className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
            </Form>
        </div>
        <div>Total Results: {products.total}</div>
        {renderedList}
    </div>)
}
