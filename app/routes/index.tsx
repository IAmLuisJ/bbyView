import type { MetaFunction, LoaderFunction } from "remix";
import { Link } from "remix";


// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
 return null;
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Best Buy Show",
    description: "Best Buy remix app"
  };
};

export default function Index() {

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">BlueBox Remix</h1>
      <Link to="/products" title="Products"><button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Products</button></Link>
    </div>
  );
}
