import Image from 'next/image';

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

async function getNews() {
  const apiKey = '9df1884cd0a44fb7b29297035a4f643f';
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=automotive&language=en&sortBy=publishedAt&pageSize=15&apiKey=${apiKey}`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.articles || []) as Article[];
  } catch (e) {
    return [];
  }
}

export default async function NewsSection() {
  const news = await getNews();
  const validNews = news.filter((article) => article.urlToImage && article.title);
  
  const gridArticles = validNews.slice(0, 4);
  const trendingArticles = validNews.slice(4, 9);
  const featuredArticle = validNews[9];

  return (
    // Added ID and scroll-margin for smooth navigation
    <section id="news" className="px-6 py-24 bg-white border-t border-gray-100 scroll-mt-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter">News & <span className="text-black">Reviews</span></h2>
           <div className="hidden md:flex gap-2">
              <span className="w-3 h-3 rounded-full bg-black animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Updates</span>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left: Article Grid (2/3 width) */}
          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gridArticles.map((article, index) => (
                <a href={article.url} target="_blank" rel="noopener noreferrer" key={index} className="group cursor-pointer block">
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg">
                    <Image 
                      src={article.urlToImage!} 
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 p-6">
                      <h3 className="text-white text-lg font-bold leading-tight group-hover:text-white transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Video Highlight Sub-section */}
            {featuredArticle && (
            <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className="block bg-gray-900 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden group cursor-pointer">
               <div className="relative z-10">
                  <span className="text-white font-black text-xs uppercase tracking-[0.3em]">Featured Story</span>
                  <h3 className="text-3xl font-black mt-4 mb-6 max-w-md italic line-clamp-3">{featuredArticle.title}</h3>
                  <button className="flex items-center gap-4 font-black uppercase text-xs tracking-widest group-hover:gap-6 transition-all">
                    <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">→</span>
                    Read Full Story
                  </button>
               </div>
               {/* Faded Background Car Image */}
               <img src={featuredArticle.urlToImage!} className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-30 grayscale transition-all duration-700" alt="" />
            </a>
            )}
          </div>

          {/* Right: Trending List (1/3 width) */}
          <div className="bg-gray-50 rounded-[40px] p-10 h-fit">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Trending Near You</h3>
            <div className="divide-y divide-gray-200">
              {trendingArticles.map((article, i) => (
                <a href={article.url} target="_blank" rel="noopener noreferrer" key={i} className="py-6 flex gap-6 group cursor-pointer first:pt-0 block">
                  <span className="text-3xl font-black text-gray-200 group-hover:text-black transition-colors tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm font-bold text-gray-800 leading-snug group-hover:text-black transition-colors line-clamp-2">
                    {article.title}
                  </p>
                </a>
              ))}
            </div>
          <button className="w-full mt-10 py-5 border-[3px] border-black rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white hover:shadow-2xl transition-all duration-300 active:scale-[0.98]">
  See all news
</button>
          </div>

        </div>
      </div>
    </section>
  );
}