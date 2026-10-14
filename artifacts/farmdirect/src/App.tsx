import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  Leaf,
  MapPin,
  Menu,
  Search,
  SlidersHorizontal,
  Sprout,
  X,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Produce = {
  id: string;
  name: string;
  variety: string;
  farm: string;
  place: string;
  distance: string;
  price: string;
  unit: string;
  category: string;
  image: string;
  note: string;
  color: string;
};

const produce: Produce[] = [
  { id: 'tomatoes', name: 'Heirloom tomatoes', variety: 'Mixed varieties · just picked', farm: 'Juniper Hill Farm', place: 'Bolton, MA', distance: '12 mi', price: '$4.80', unit: ' / lb', category: 'Vegetables', image: '/tomatoes.jpg', note: 'Picked this morning', color: 'bg-[#e9ddd0]' },
  { id: 'strawberries', name: 'June strawberries', variety: 'Chandler · sweet & fragrant', farm: 'Little Brook Fields', place: 'Concord, MA', distance: '8 mi', price: '$6.25', unit: ' / pint', category: 'Fruit', image: '/strawberries.jpg', note: 'Field-grown', color: 'bg-[#ead9d5]' },
  { id: 'carrots', name: 'Rainbow carrots', variety: 'Bunched · tender tops on', farm: 'North Row Gardens', place: 'Acton, MA', distance: '16 mi', price: '$3.60', unit: ' / bunch', category: 'Vegetables', image: '/carrots.jpg', note: 'Harvested today', color: 'bg-[#e9dfce]' },
  { id: 'peas', name: 'Sugar snap peas', variety: 'Crisp, picked at peak', farm: 'Meadow & Mill', place: 'Sudbury, MA', distance: '19 mi', price: '$5.10', unit: ' / lb', category: 'Vegetables', image: '/peas.jpg', note: 'Small batch', color: 'bg-[#dce4d3]' },
  { id: 'zucchini', name: 'Golden zucchini', variety: 'Young, delicate and tender', farm: 'Juniper Hill Farm', place: 'Bolton, MA', distance: '12 mi', price: '$3.90', unit: ' / lb', category: 'Vegetables', image: '/zucchini.jpg', note: 'Picked this morning', color: 'bg-[#e7e3ce]' },
];

const categories = ['Everything', 'Vegetables', 'Fruit', 'Herbs', 'Dairy & eggs', 'Pantry'];

function Brand() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" data-testid="link-home-brand">
      <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#244936] text-[#f8f1df] transition-transform group-hover:-rotate-6">
        <Sprout size={22} strokeWidth={1.8} />
      </span>
      <span className="font-display text-[22px] font-semibold leading-none tracking-[-.04em] text-[#244936]">FarmDirect<span className="text-[#d56d4c]">.</span></span>
    </Link>
  );
}

function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isBrowse = location.startsWith('/browse');
  return (
    <header className="relative z-20 border-b border-[#e9e4d9] bg-[#fbf9f2]">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Brand />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          <Link href="/browse" className={`text-[13px] font-semibold transition-colors ${isBrowse ? 'text-[#244936]' : 'text-[#69766c] hover:text-[#244936]'}`} data-testid="link-nav-browse">Browse produce</Link>
          <a href="/#how-it-works" className="text-[13px] font-semibold text-[#69766c] transition-colors hover:text-[#244936]" data-testid="link-nav-how">How it works</a>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#536458]" data-testid="text-location-header"><MapPin size={14} className="text-[#d56d4c]" /> Greater Boston <ChevronDown size={13} /></span>
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <Link href="/browse" className="text-[13px] font-semibold text-[#536458] transition-colors hover:text-[#244936]" data-testid="link-nav-for-growers">For growers</Link>
          <Link href="/browse" className="rounded-full bg-[#244936] px-5 py-3 text-[13px] font-semibold text-[#fbf9f2] shadow-sm transition-all hover:bg-[#315b41] hover:shadow-md active:scale-[.98]" data-testid="button-start-browsing">Start browsing <ArrowRight size={14} className="ml-2 inline" /></Link>
        </div>
        <button type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} className="grid h-10 w-10 place-items-center rounded-full text-[#244936] hover:bg-[#eeece2] md:hidden" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuOpen && <div className="absolute left-0 right-0 top-full border-b border-[#e9e4d9] bg-[#fbf9f2] px-5 pb-5 shadow-lg md:hidden">
        <Link href="/browse" onClick={() => setMenuOpen(false)} className="block border-b border-[#e9e4d9] py-4 text-sm font-semibold text-[#244936]" data-testid="link-mobile-browse">Browse produce</Link>
        <a href="/#how-it-works" onClick={() => setMenuOpen(false)} className="block py-4 text-sm font-semibold text-[#536458]" data-testid="link-mobile-how">How it works</a>
        <p className="flex items-center gap-2 text-xs text-[#69766c]"><MapPin size={14} /> Greater Boston</p>
      </div>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#e9e4d9] bg-[#f2efe5]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <Brand />
        <p className="text-xs leading-relaxed text-[#718075]" data-testid="text-footer-note">Good food has a nearby beginning. Find yours.</p>
        <Link href="/browse" className="text-xs font-semibold text-[#315b41] hover:underline" data-testid="link-footer-browse">Explore what’s in season <ArrowRight className="ml-1 inline" size={13} /></Link>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="min-h-[100dvh] bg-[#fbf9f2] text-[#26392e]"><Header />{children}<Footer /></div>;
}

function ProductCard({ item }: { item: Produce }) {
  return (
    <article className="group overflow-hidden rounded-[18px] border border-[#e9e4d9] bg-[#fffdf8] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_-22px_rgba(34,63,45,.35)]" data-testid={`card-product-${item.id}`}>
      <div className={`relative aspect-[1.18/1] overflow-hidden ${item.color}`}>
        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]" data-testid={`img-product-${item.id}`} />
        <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-[#fbf9f0]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#345642]" data-testid={`badge-provenance-${item.id}`}>{item.note}</span>
      </div>
      <div className="p-4 sm:p-[18px]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#a46d47]">{item.category}</p>
            <h3 className="mt-1 font-display text-[19px] font-semibold leading-tight tracking-[-.025em] text-[#26392e]" data-testid={`text-product-name-${item.id}`}>{item.name}</h3>
            <p className="mt-1 text-[11px] text-[#839087]">{item.variety}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-[20px] font-semibold tracking-[-.04em] text-[#244936]" data-testid={`text-price-${item.id}`}>{item.price}</p>
            <span className="text-[10px] text-[#839087]">{item.unit}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[#efede5] pt-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-[#526458]" data-testid={`text-farm-${item.id}`}>{item.farm}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[#89938a]"><MapPin size={11} /> {item.place}</p>
          </div>
          <span className="shrink-0 rounded-full bg-[#f1f1e7] px-2.5 py-1.5 text-[10px] font-semibold text-[#667869]" data-testid={`text-distance-${item.id}`}>{item.distance} away</span>
        </div>
      </div>
      <span className="sr-only">Listing preview only</span>
    </article>
  );
}

function SearchBox({ value, onChange, onSubmit, compact = false }: { value: string; onChange: (value: string) => void; onSubmit: (event: FormEvent) => void; compact?: boolean }) {
  return (
    <form onSubmit={onSubmit} className={`flex w-full items-center rounded-full border border-[#dedfd3] bg-[#fffdf8] p-1.5 pl-4 shadow-[0_5px_20px_-16px_rgba(28,52,37,.5)] transition-all focus-within:border-[#91a38d] focus-within:shadow-[0_0_0_3px_rgba(49,91,65,.08)] ${compact ? 'max-w-[470px]' : 'max-w-[510px]'}`} role="search">
      <Search size={17} className="shrink-0 text-[#879387]" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Try tomatoes, apples, eggs..." aria-label="Search local produce" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[13px] text-[#26392e] outline-none placeholder:text-[#9ba39a]" data-testid="input-produce-search" />
      <button type="submit" className="shrink-0 rounded-full bg-[#244936] px-4 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#315b41] active:scale-[.98]" data-testid="button-search-produce">Search</button>
    </form>
  );
}

function Home() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const submitSearch = (event: FormEvent) => { event.preventDefault(); setLocation(`/browse${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`); };
  return (
    <Shell>
      <main className="page-enter">
        <section className="relative overflow-hidden bg-[#f0eee3]">
          <div className="absolute -right-28 -top-36 h-[460px] w-[460px] rounded-full border border-[#d7d9c9] opacity-70" />
          <div className="absolute -right-12 -top-20 h-[330px] w-[330px] rounded-full border border-[#d7d9c9] opacity-70" />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-9 px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_.88fr] lg:gap-12 lg:px-10 lg:pb-[86px] lg:pt-[78px]">
            <div className="relative z-10 max-w-[570px]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9ddce] bg-[#f7f5ec] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#496750]" data-testid="badge-local-market">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d66f4f]" /> The neighborhood harvest
              </div>
              <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-medium leading-[.96] tracking-[-.065em] text-[#244936]" data-testid="text-hero-title">The best food<br className="hidden sm:block" /> comes from <em className="font-medium text-[#d56d4c]">close by.</em></h1>
              <p className="mt-6 max-w-[440px] text-[15px] leading-[1.75] text-[#68766b] sm:text-[16px]" data-testid="text-hero-description">Meet the growers behind your food. Browse what’s fresh, know where it came from, and pay a fair price from the very first mile.</p>
              <div className="mt-7"><SearchBox value={query} onChange={setQuery} onSubmit={submitSearch} /></div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium text-[#738075]">
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[#d56d4c]" /> 35 miles around Boston</span>
                <span className="h-1 w-1 rounded-full bg-[#c9cfc3]" />
                <span>From farms, not warehouses</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[570px] lg:max-w-none">
              <div className="absolute -left-3 top-10 z-10 hidden rounded-[16px] border border-[#e7e1d5] bg-[#fffdf8] p-3.5 shadow-[0_12px_30px_-20px_rgba(31,52,37,.35)] sm:block lg:-left-8">
                <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.13em] text-[#889288]"><span className="h-1.5 w-1.5 rounded-full bg-[#8aab77]" /> Grown nearby</p>
                <p className="mt-1.5 font-display text-[17px] font-semibold text-[#31533c]">12 miles from you</p>
              </div>
              <div className="grain relative aspect-[1.3/1] overflow-hidden rounded-[26px] bg-[#d8d6c2] shadow-[0_26px_60px_-38px_rgba(30,57,39,.4)] sm:aspect-[1.42/1]">
                <img src="/tomatoes.jpg" alt="Fresh heirloom tomatoes picked at a nearby farm" className="absolute inset-0 h-full w-full object-cover object-center" data-testid="img-hero-harvest" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172b1f]/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                  <div className="text-white">
                    <p className="text-[9px] font-bold uppercase tracking-[.18em] text-white/75">Today, from the field</p>
                    <p className="mt-1 font-display text-[23px] font-medium tracking-[-.02em] sm:text-[29px]">A little closer to your table.</p>
                    <p className="mt-1 text-[11px] text-white/80">Juniper Hill Farm · Bolton, Massachusetts</p>
                  </div>
                  <Link href="/browse" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f6f0df] text-[#244936] transition-transform hover:rotate-[-35deg]" aria-label="Explore nearby produce" data-testid="link-hero-explore"><ArrowDownRight size={20} /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1240px] px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-10" aria-labelledby="category-heading">
          <div className="flex items-end justify-between gap-5">
            <div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#ae7752]">What sounds good?</p><h2 id="category-heading" className="mt-2 font-display text-[30px] font-medium tracking-[-.04em] text-[#244936] sm:text-[36px]">A good place to start</h2></div>
            <Link href="/browse" className="hidden items-center gap-1 text-xs font-semibold text-[#315b41] transition-all hover:gap-2 sm:flex" data-testid="link-all-categories">All produce <ArrowRight size={14} /></Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              ['Vegetables', 'The good green things', 'bg-[#e3eadb]', '↗'],
              ['Fruit', 'Picked at their sweetest', 'bg-[#f0e1d9]', '◒'],
              ['Herbs', 'A handful of fresh', 'bg-[#e5e8d7]', '✳'],
              ['Dairy & eggs', 'From small happy flocks', 'bg-[#efe9d7]', '◌'],
              ['Pantry', 'Made close to home', 'bg-[#e7e0d2]', '⌁'],
              ['Flowers', 'A little field color', 'bg-[#eee0dd]', '✳'],
            ].map(([name, text, tone, glyph]) => <Link href={`/browse?category=${encodeURIComponent(name)}`} key={name} className={`group relative flex min-h-[118px] flex-col justify-between overflow-hidden rounded-[17px] p-4 transition-all hover:-translate-y-1 hover:shadow-md ${tone}`} data-testid={`link-category-${name.toLowerCase().replaceAll(' ', '-')}`}>
              <span className="absolute -right-1 -top-4 font-display text-[73px] font-light leading-none text-[#526b53]/15 transition-transform group-hover:rotate-12 group-hover:scale-110">{glyph}</span>
              <span className="relative font-display text-[18px] font-semibold tracking-[-.03em] text-[#31513a]">{name}</span><span className="relative text-[10px] text-[#79867b]">{text}</span>
            </Link>)}
          </div>
        </section>
        <section className="bg-[#f2efe5] py-12 sm:py-[70px]">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#ae7752]">Fresh around you</p><h2 className="mt-2 font-display text-[30px] font-medium tracking-[-.04em] text-[#244936] sm:text-[36px]">Picked for this week</h2><p className="mt-2 text-xs text-[#788479]">Local harvests, honest prices, grower names included.</p></div>
              <Link href="/browse" className="mb-1 hidden items-center gap-1 text-xs font-semibold text-[#315b41] hover:gap-2 sm:flex" data-testid="link-see-all-listings">See all listings <ArrowRight size={14} /></Link>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {produce.slice(0, 4).map((item) => <ProductCard key={item.id} item={item} />)}
            </div>
            <Link href="/browse" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#d9ddce] bg-[#fbf9f2] py-3.5 text-xs font-semibold text-[#315b41] sm:hidden" data-testid="link-mobile-see-listings">Browse all nearby produce <ArrowRight size={14} /></Link>
          </div>
        </section>
        <section id="how-it-works" className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-[82px] lg:px-10">
          <div className="grid gap-9 md:grid-cols-[.7fr_1fr] md:gap-16">
            <div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#ae7752]">No mystery miles</p><h2 className="mt-3 max-w-[360px] font-display text-[34px] font-medium leading-[1.08] tracking-[-.05em] text-[#244936] sm:text-[43px]">Know who grew it.<br />Know what it costs.</h2><p className="mt-4 max-w-[350px] text-sm leading-7 text-[#758176]">FarmDirect brings the field a little closer. Every listing starts with a grower, a place, and a price you can understand.</p></div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['01', 'Meet the grower', 'Real farms, real names, and the places your food comes from.'],
                ['02', 'See what’s fresh', 'Browse a living snapshot of what’s coming in from nearby.'],
                ['03', 'Keep it local', 'A shorter route from the field means more value stays close.'],
              ].map(([number, title, copy]) => <div key={number} className="rounded-[17px] border border-[#e9e4d9] bg-[#fffdf8] p-5 sm:p-4">
                <span className="font-display text-[27px] italic text-[#d56d4c]">{number}</span><h3 className="mt-4 font-display text-[17px] font-semibold text-[#31513a]">{title}</h3><p className="mt-2 text-[11px] leading-5 text-[#79867b]">{copy}</p>
              </div>)}
            </div>
          </div>
        </section>
        <section className="px-5 pb-12 sm:px-8 sm:pb-16 lg:px-10">
          <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[22px] bg-[#294b36] px-6 py-9 text-[#f7f3e8] sm:px-10 sm:py-11">
            <div className="absolute -right-8 -top-24 h-64 w-64 rounded-full border border-white/10" /><div className="absolute -right-2 -top-16 h-48 w-48 rounded-full border border-white/10" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><div><p className="text-[9px] font-bold uppercase tracking-[.19em] text-[#d7c69a]">For the people who grow it</p><h2 className="mt-2 font-display text-[27px] font-medium tracking-[-.03em] sm:text-[34px]">Good things grow better together.</h2><p className="mt-2 text-xs text-[#d0d8cb]">A fairer way to bring local food within reach.</p></div><Link href="/browse" className="rounded-full bg-[#f4edda] px-5 py-3 text-[12px] font-semibold text-[#294b36] transition-all hover:bg-white" data-testid="link-grower-explore">Explore FarmDirect <ArrowRight className="ml-2 inline" size={14} /></Link></div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function Browse() {
  const [location, setLocation] = useLocation();
  const currentSearch = location.includes('?') ? location.split('?')[1] : '';
  const params = new URLSearchParams(currentSearch);
  const initialQuery = params.get('q') ?? '';
  const initialCategory = params.get('category') ?? 'Everything';
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(categories.includes(initialCategory) ? initialCategory : 'Everything');
  const filtered = useMemo(() => produce.filter((item) => {
    const matchesCategory = activeCategory === 'Everything' || item.category === activeCategory;
    const text = `${item.name} ${item.variety} ${item.farm} ${item.place} ${item.category}`.toLowerCase();
    return matchesCategory && text.includes(query.trim().toLowerCase());
  }), [activeCategory, query]);
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    setLocation(`/browse${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };
  return (
    <Shell>
      <main className="page-enter min-h-[75vh]">
        <section className="border-b border-[#e9e4d9] bg-[#f0eee3]">
          <div className="mx-auto max-w-[1240px] px-5 pb-8 pt-9 sm:px-8 sm:pb-10 sm:pt-12 lg:px-10">
            <div className="flex items-center gap-2 text-[10px] font-semibold text-[#849086]"><Link href="/" className="hover:text-[#315b41]" data-testid="link-breadcrumb-home">Home</Link><span>/</span><span className="text-[#315b41]" data-testid="text-breadcrumb-current">Browse produce</span></div>
            <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#ae7752]">Greater Boston · 35 mile radius</p><h1 className="mt-2 font-display text-[39px] font-medium leading-tight tracking-[-.05em] text-[#244936] sm:text-[49px]" data-testid="text-browse-heading">Good things, grown nearby.</h1><p className="mt-2 text-sm text-[#758176]">A look at what local farms are bringing in right now.</p></div>
              <SearchBox value={query} onChange={setQuery} onSubmit={submitSearch} compact />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1240px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          <div className="mb-7 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Produce categories">
                {categories.map((category) => <button type="button" role="tab" aria-selected={activeCategory === category} key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full border px-4 py-2.5 text-[11px] font-semibold transition-all ${activeCategory === category ? 'border-[#244936] bg-[#244936] text-[#f9f6eb]' : 'border-[#e2e1d6] bg-[#fffdf8] text-[#68766b] hover:border-[#b7c1b0] hover:text-[#315b41]'}`} data-testid={`filter-category-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 text-[11px] font-medium text-[#768378] sm:flex"><SlidersHorizontal size={14} /> Sorted by nearby</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#e9e4d9] pb-4">
              <p className="text-xs text-[#7d897e]" data-testid="text-listing-count"><strong className="font-semibold text-[#31513a]">{filtered.length} listings</strong> from nearby growers</p>
              <span className="flex items-center gap-1.5 text-[10px] text-[#889288]"><MapPin size={12} className="text-[#d56d4c]" /> Near Boston, MA</span>
            </div>
          </div>
          {filtered.length > 0 ? <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((item) => <ProductCard key={item.id} item={item} />)}</div> : <div className="flex min-h-[290px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#d6ddcf] bg-[#f7f5ec] px-6 text-center" data-testid="empty-search-results"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#e8ecdf] text-[#45654b]"><Search size={20} /></span><h2 className="mt-4 font-display text-[23px] text-[#31513a]">Nothing in the basket yet.</h2><p className="mt-2 max-w-[310px] text-xs leading-5 text-[#7d897e]">Try another search or pick a different category to see what nearby farms have.</p><button type="button" onClick={() => { setQuery(''); setActiveCategory('Everything'); setLocation('/browse'); }} className="mt-5 rounded-full bg-[#244936] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#315b41]" data-testid="button-clear-search">Clear filters</button></div>}
          <div className="mt-9 flex flex-col gap-3 rounded-[17px] border border-[#e9e4d9] bg-[#f3f0e7] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="flex items-center gap-2 text-[11px] leading-5 text-[#6f7c71]"><Leaf size={15} className="shrink-0 text-[#52724f]" /> Every listing shows who grew it and where. Local food, without the guesswork.</p>
            <Link href="/" className="shrink-0 text-[11px] font-semibold text-[#315b41] hover:underline" data-testid="link-browse-back-home">How FarmDirect works <ArrowRight size={13} className="ml-1 inline" /></Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/browse" component={Browse} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
