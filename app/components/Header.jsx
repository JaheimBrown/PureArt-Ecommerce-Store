import React, {useState, useEffect} from 'react';
import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense} from 'react';

// IMAGES & ICONS
import logo from './images/logo.svg';
import search from './images/icons/search.svg';
import cart from './images/icons/cart.svg';
import menu from './images/icons/menu.svg';

export function Header({header, isLoggedIn, cart}) {
  // STATES
  const [scrolled, setScrolled] = useState(false);
  const {shop, menu} = header;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };

      // Attach the scroll event listener when the component mounts
      window.addEventListener('scroll', handleScroll);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <header className={`header ${scrolled ? 'glass' : 'normal'}`}>
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <img src={logo} alt="PureArt Logo" />
      </NavLink>
      <HeaderMenu menu={menu} viewport="desktop" />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

export function HeaderMenu({menu, viewport}) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {/* {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )} */}

      {/* PUT menu VARIABLE HERE LATER FOR STORE MENU LINKS */}
      {/* (menu || FALLBACK_HEADER_MENU) */}
      <NavLink
        end
        onClick={closeAside}
        prefetch="intent"
        style={activeLinkStyle}
        to="/"
      >
        Home
      </NavLink>

      {FALLBACK_HEADER_MENU.items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
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

function HeaderCtas({cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <SearchToggle />
      <CartToggle cart={cart} />
      <HeaderMenuMobileToggle />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <img src={menu} alt="menu icon" />
    </a>
  );
}

function SearchToggle() {
  return (
    <a href="#search-aside">
      <img src={search} alt="search icon" />
    </a>
  );
}

function CartBadge({count}) {
  return (
    <a
      href="#cart-aside"
      className="relative flex justify-center items-center gap-2"
    >
      <img src={cart} alt="cart icon" />{' '}
      <span
        className="absolute -top-2 -right-2 rounded-full bg-white 
      px-1"
      >
        {count}
      </span>
    </a>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'services',
      type: 'PAGE',
      url: '/pages/services',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'Contact',
      type: 'PAGE',
      url: '/pages/contact',
      items: [],
    },
  ],
};

function activeLinkStyle({isActive, isPending}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };

      // Attach the scroll event listener when the component mounts
      window.addEventListener('scroll', handleScroll);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return {
    fontWeight: isActive ? 'bold' : '',
    color: scrolled ? 'white' : 'white',
  };
}
