import { useCatch, useLoaderData } from "remix"
import type { LoaderFunction } from "remix";
import { createURLfromSKU } from "~/api/bestbuy";
export const loader: LoaderFunction = async ({ params }) => {
    //pull SKU and load data
    //let url = "https://api.bestbuy.com/v1/products/" + params.SKU + ".json?apiKey=XXX";
    const url = createURLfromSKU(params.SKU);
    let response = await fetch(url);
    if(response.status === 404) {
        throw new Response("Product not found", {status: 404});
    }
    // if(response.errorCode === 403) {
    //     throw new Response("Missing API Key", {status: 404});
    // }
    return await response.json();
}

export default function SKU() {
    const SKU = useLoaderData();
    const renderInfo = Object.entries(SKU).map((val) => { return (<li key={val[0]}> {val[0]} : {JSON.stringify(val[1])}</li>) });

    return (<div className="rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Product</div>
            <p>{SKU.name}</p>
            <img className="w-64" alt="product picture" src={SKU.image}></img>
        </div>
        <div className="px-6">
            {renderInfo}
        </div>
    </div>)
}

//Catchboundary won't work because the API still returns a valid 200 response. Need to throw a response in the loader
export function CatchBoundary() {
    const caught = useCatch();
    if (caught.status === 404) {
        return (<div className="error-containter">
            Sorry, we could not find that SKU
        </div>)
    }
    throw new Error(`Unhandled error`);
}