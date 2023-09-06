import {useMatches, NavLink} from '@remix-run/react';
import {Link} from '@remix-run/react';

// ASSET IMPORTS
import logo from './images/logo.svg';
import pinterest from './images/icons/pinterest.svg';
import facebook from './images/icons/facebook.svg';
import instagram from './images/icons/instagram.svg';

export function Footer({menu}) {
  return (
    <footer className="">
      <div className="footer flex lg:flex-row flex-col items-start gap-16 px-6 py-8">
        <div className="flex justify-start items-start gap-6 max-w-[580px]">
          <img src={logo} alt="Pure Art Logo" />
          <p className="paragraph-text-sm text-white">
            We are a Gift Shop at heart, and we can help you create a
            "CUSTOMIZABLE" gift for someone special. We also provide graphic
            design assistance in the creation of FLYERS, BUSINESS CARDS, LOGOS,
            SIGNAGE, POSTERS, and other materials to help you highlight your
            business at a reasonable cost.
          </p>
        </div>

        <div className="flex-1 flex gap-12 flex-wrap justify-evenly">
          <div className="flex flex-col gap-3 items-start justify-start">
            <h3 className="text-white text-[24px] font-bold leading-[28px]">
              Shop
            </h3>
            <div className="flex flex-col gap-2 items-start justify-start">
              <Link to={`/`} className="text-white">
                Home
              </Link>
              <Link to={`/collections`} className="text-white">
                Collections
              </Link>
              <Link to={`/services`} className="text-white">
                Services
              </Link>
              <Link to={`/about`} className="text-white">
                About
              </Link>
              <Link to={`/contact`} className="text-white">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-start justify-start">
            <h3 className="text-white text-[24px] font-bold leading-[28px]">
              Company
            </h3>
            <FooterMenu menu={menu} />
          </div>

          <div className="flex flex-col gap-3 items-start justify-start">
            <h3 className="text-white text-[24px] font-bold leading-[28px]">
              Shop
            </h3>
            <div className="flex flex-col gap-2 items-start justify-start">
              <Link to={`/`} className="social-btn">
                <img src={facebook} alt="" /> facebook
              </Link>
              <Link to={`/collections`} className="social-btn">
                <img src={instagram} alt="" /> instgram
              </Link>
              <Link to={`/services`} className="social-btn">
                <img src={pinterest} alt="" /> pinterest
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-accent p-3 flex justify-center items-center">
        <p className="text-white text-14px text-center">
          © 2023 Pureart, a gift store for all your needs.
        </p>
      </div>
    </footer>
  );
}

function FooterMenu({menu}) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  return (
    <nav
      className="flex flex-col gap-2 items-start justify-start"
      role="navigation"
    >
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : '',
    color: isPending ? 'grey' : 'white',
  };
}
