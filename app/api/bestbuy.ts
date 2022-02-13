
export const baseURL = "https://api.bestbuy.com/v1/products";

export const Key = "EDq54Li1Ts2FSAorlXkOw5JJ";

export function createURLfromSKU(SKU: string | undefined, format: string = "json") {
    let url = baseURL + "/" + SKU + "." + format + "?" + "apiKey=" + Key;
    return url;
}

export function createSearchQuery(term: string) {
    // "https://api.bestbuy.com/v1/products(search=appliances)?format=json&show=sku,name,salePrice&apiKey=YourAPIKey"
    let url = baseURL + "(search=" + term + ")?format=json&show=sku,name,salePrice&" + "apiKey=" + Key;
    return url;
}   