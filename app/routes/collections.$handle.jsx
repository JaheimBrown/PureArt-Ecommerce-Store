import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import {useVariantUrl} from '~/utils';

// COMPONENTS
import ProductCard from '~/components/ProductCard';

export const meta = ({data}) => {
  return [{title: `PureArt | ${data.collection.title} Collection`}];
};

export async function loader({request, params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData();

  return (
    <div className="collection">
      <div
        className="absolute top-0 left-0 w-full h-[50vh] max-h-[600px] aspect-video darken-image-sm py-16 px-6"
        style={{
          backgroundImage: `url(${collection.image.url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="max-w-[1300px] w-full mx-auto px-6 py-16">
        <h1 className="mt-12 heading-2 text-white relative">
          {collection.title}
        </h1>
        <p
          className="relative paragraph-text max-w-[650px] mt-6"
          style={{color: '#E3E3E3'}}
        >
          {collection.description}
        </p>
      </div>

      <Pagination connection={collection.products}>
        {({nodes, isLoading, NextLink}) => (
          <>
            <ProductsGrid products={nodes} />
            <br />
            <NextLink>
              {isLoading ? (
                'Loading...'
              ) : (
                <span
                  className="primary-btn max-w-[200px] mx-auto mt-16"
                  style={{backgroundColor: '#000', color: '#fff'}}
                >
                  Load more ↓
                </span>
              )}
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

function ProductsGrid({products}) {
  return (
    <div className="products-grid-container mt-16">
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        );
      })}
    </div>
  );
}

function ProductItem({product, loading}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link
      className="product-item product-card-border"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {product.featuredImage && (
        <Image
          alt={product.featuredImage.altText || product.title}
          aspectRatio="1/1"
          data={product.featuredImage}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <div className="flex flex-col items-start justify-start gap-[2px] p-3">
        <h4 className="text-sm font-medium">{product.title}</h4>
        <small>
          <Money
            data={product.priceRange.minVariantPrice}
            className="text-[18px] font-bold leading-[20px]"
          />
        </small>
      </div>
    </Link>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      image {
        id
        url
        altText
        width
        height
      }
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
