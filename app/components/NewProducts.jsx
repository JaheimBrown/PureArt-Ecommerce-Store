import {Suspense} from 'react';
import {Await, useLoaderData, Link} from '@remix-run/react';

import ProductCard from './ProductCard';

//COMPONENTS
const NewProducts = ({products}) => {
  return (
    <section className="p-6">
      <h2 className="uppercase text-[32px] font-medium">New in store</h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="products-grid-container">
              {products.nodes.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      {/* RENDER NEW PRODUCT CARD COMPONENT FOR EACH NEW ITEM */}
    </section>
  );
};

export default NewProducts;
