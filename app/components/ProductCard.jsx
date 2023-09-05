import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

const ProductCard = ({product}) => {
  return (
    <Link
      key={product.id}
      className="product-card-border"
      to={`/products/${product.handle}`}
    >
      <Image
        data={product.images.nodes[0]}
        aspectRatio="1/1"
        sizes="(min-width: 45em) 20vw, 50vw"
      />
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
};

export default ProductCard;
