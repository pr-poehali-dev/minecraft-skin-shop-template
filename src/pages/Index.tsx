import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Skin {
  id: number;
  name: string;
  image: string;
  rating: number;
  downloads: number;
  tags: string[];
  reviews: number;
  category: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [downloaded, setDownloaded] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);

  const skins: Skin[] = [
    {
      id: 1,
      name: 'Легендарный Стив',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/646f47b0-4d23-4c58-86c2-1722ee4b597c.jpg',
      rating: 4.8,
      downloads: 25420,
      tags: ['популярное', 'классика', 'новичкам'],
      reviews: 542,
      category: 'Классика'
    },
    {
      id: 2,
      name: 'Алекс Воин',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a4a03380-f036-43a8-ab1e-52bfe1176fac.jpg',
      rating: 4.9,
      downloads: 19350,
      tags: ['эпик', 'воин', 'топ'],
      reviews: 389,
      category: 'Воины'
    },
    {
      id: 3,
      name: 'Крипер Эдишн',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/518c351c-c15e-45bf-ad53-96b5894d957a.jpg',
      rating: 4.7,
      downloads: 16870,
      tags: ['монстр', 'популярное', 'крипер'],
      reviews: 298,
      category: 'Монстры'
    },
    {
      id: 4,
      name: 'Алмазный Рыцарь',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/646f47b0-4d23-4c58-86c2-1722ee4b597c.jpg',
      rating: 5.0,
      downloads: 22200,
      tags: ['премиум', 'алмаз', 'рыцарь'],
      reviews: 667,
      category: 'Премиум'
    },
    {
      id: 5,
      name: 'Огненный Маг',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a4a03380-f036-43a8-ab1e-52bfe1176fac.jpg',
      rating: 4.6,
      downloads: 14654,
      tags: ['маг', 'огонь', 'магия'],
      reviews: 245,
      category: 'Магия'
    },
    {
      id: 6,
      name: 'Эндермен Про',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/518c351c-c15e-45bf-ad53-96b5894d957a.jpg',
      rating: 4.9,
      downloads: 18230,
      tags: ['эндер', 'темное', 'популярное'],
      reviews: 376,
      category: 'Темные'
    },
    {
      id: 7,
      name: 'Зомби Выживший',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/d5b2bf04-8f33-4b7a-80b2-3c3786818e91.jpg',
      rating: 4.5,
      downloads: 13120,
      tags: ['зомби', 'хоррор', 'мобы'],
      reviews: 187,
      category: 'Монстры'
    },
    {
      id: 8,
      name: 'Ниндзя Тень',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/f9c9d97f-31bd-4bd7-a107-e47baad5b065.jpg',
      rating: 4.9,
      downloads: 20100,
      tags: ['ниндзя', 'популярное', 'стелс'],
      reviews: 456,
      category: 'Воины'
    },
    {
      id: 9,
      name: 'Космонавт',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/ade6a34f-d83c-48e5-803a-d2b3435b6a56.jpg',
      rating: 4.8,
      downloads: 17890,
      tags: ['космос', 'эпик', 'уникальное'],
      reviews: 334,
      category: 'Космос'
    },
    {
      id: 10,
      name: 'Скелет Лучник',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/518c351c-c15e-45bf-ad53-96b5894d957a.jpg',
      rating: 4.4,
      downloads: 11560,
      tags: ['скелет', 'лучник', 'мобы'],
      reviews: 156,
      category: 'Монстры'
    },
    {
      id: 11,
      name: 'Железный Голем',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/646f47b0-4d23-4c58-86c2-1722ee4b597c.jpg',
      rating: 4.7,
      downloads: 15340,
      tags: ['голем', 'защитник', 'мощный'],
      reviews: 289,
      category: 'Защитники'
    },
    {
      id: 12,
      name: 'Пиратский Капитан',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a4a03380-f036-43a8-ab1e-52bfe1176fac.jpg',
      rating: 4.6,
      downloads: 12780,
      tags: ['пират', 'море', 'приключения'],
      reviews: 198,
      category: 'Пираты'
    },
    {
      id: 13,
      name: 'Драконий Воин',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/f9c9d97f-31bd-4bd7-a107-e47baad5b065.jpg',
      rating: 5.0,
      downloads: 24500,
      tags: ['дракон', 'популярное', 'эпик'],
      reviews: 678,
      category: 'Премиум'
    },
    {
      id: 14,
      name: 'Ведьма Лесная',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a4a03380-f036-43a8-ab1e-52bfe1176fac.jpg',
      rating: 4.5,
      downloads: 10230,
      tags: ['ведьма', 'магия', 'мистика'],
      reviews: 145,
      category: 'Магия'
    },
    {
      id: 15,
      name: 'Рыцарь Света',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/646f47b0-4d23-4c58-86c2-1722ee4b597c.jpg',
      rating: 4.8,
      downloads: 16450,
      tags: ['рыцарь', 'святой', 'популярное'],
      reviews: 312,
      category: 'Воины'
    },
    {
      id: 16,
      name: 'Демон Ада',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/518c351c-c15e-45bf-ad53-96b5894d957a.jpg',
      rating: 4.9,
      downloads: 19870,
      tags: ['демон', 'ад', 'темное'],
      reviews: 445,
      category: 'Темные'
    },
    {
      id: 17,
      name: 'Самурай Чести',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/f9c9d97f-31bd-4bd7-a107-e47baad5b065.jpg',
      rating: 4.9,
      downloads: 21340,
      tags: ['самурай', 'популярное', 'япония'],
      reviews: 489,
      category: 'Воины'
    },
    {
      id: 18,
      name: 'Король Майнкрафта',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/646f47b0-4d23-4c58-86c2-1722ee4b597c.jpg',
      rating: 5.0,
      downloads: 28900,
      tags: ['король', 'корона', 'премиум'],
      reviews: 756,
      category: 'Премиум'
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleDownload = (skin: Skin) => {
    setDownloaded(prev => [...prev, skin.id]);
    const element = document.createElement('a');
    element.href = skin.image;
    element.download = `${skin.name}.png`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredSkins = skins.filter(skin =>
    skin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const popularSkins = [...filteredSkins].sort((a, b) => b.downloads - a.downloads);
  const topRatedSkins = [...filteredSkins].sort((a, b) => b.rating - a.rating);

  const displaySkins = activeTab === 'popular' ? popularSkins : 
                       activeTab === 'catalog' ? filteredSkins :
                       filteredSkins.filter(s => favorites.includes(s.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🎮</div>
              <h1 className="text-2xl font-bold text-primary">MINECRAFT SKINS</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                className="relative hover:glow-accent"
                onClick={() => setActiveTab('favorites')}
              >
                <Icon name="Heart" className={favorites.length > 0 ? 'fill-accent text-accent' : ''} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </Button>
              <div className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-lg border border-border">
                <Icon name="Download" className="text-primary" size={20} />
                <span className="text-sm font-bold">{downloaded.length} скачано</span>
              </div>
              <Button variant="outline" size="icon" className="hover:glow-secondary">
                <Icon name="User" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input 
              placeholder="Поиск по скинам и тегам..." 
              className="pl-10 bg-background border-border focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border">
            <TabsTrigger value="popular" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="TrendingUp" className="mr-2" size={18} />
              Популярное
            </TabsTrigger>
            <TabsTrigger value="catalog" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
              <Icon name="Grid3x3" className="mr-2" size={18} />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Heart" className="mr-2" size={18} />
              Избранное
            </TabsTrigger>
          </TabsList>

          {['popular', 'catalog', 'favorites'].map(tab => (
            <TabsContent key={tab} value={tab}>
              {displaySkins.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-muted-foreground text-lg">
                    {tab === 'favorites' ? 'Нет избранных скинов' : 'Скины не найдены'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displaySkins.map((skin) => (
                      <Card 
                        key={skin.id} 
                        className="pixel-corners overflow-hidden border-2 border-border hover:border-primary transition-all hover:glow-primary group bg-card"
                      >
                        <CardHeader className="p-0">
                          <Dialog>
                            <DialogTrigger asChild>
                              <div 
                                className="relative cursor-pointer overflow-hidden bg-muted aspect-square"
                                onClick={() => setSelectedSkin(skin)}
                              >
                                <img 
                                  src={skin.image} 
                                  alt={skin.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(skin.id);
                                    }}
                                  >
                                    <Icon 
                                      name="Heart" 
                                      size={16}
                                      className={favorites.includes(skin.id) ? 'fill-accent text-accent' : ''}
                                    />
                                  </Button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                  <div className="flex items-center gap-2 text-white">
                                    <Icon name="Star" size={16} className="fill-minecraft-gold text-minecraft-gold" />
                                    <span className="font-bold">{skin.rating}</span>
                                    <span className="text-sm opacity-80">({skin.reviews})</span>
                                  </div>
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">{skin.name}</DialogTitle>
                              </DialogHeader>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                                  <img 
                                    src={skin.image} 
                                    alt={skin.name}
                                    className="w-full h-full object-cover animate-rotate-slow"
                                  />
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-2">Рейтинг</p>
                                    <div className="flex items-center gap-2">
                                      <Icon name="Star" className="fill-minecraft-gold text-minecraft-gold" />
                                      <span className="text-xl font-bold">{skin.rating}</span>
                                      <span className="text-muted-foreground">({skin.reviews} отзывов)</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-2">Скачиваний</p>
                                    <div className="flex items-center gap-2">
                                      <Icon name="Download" className="text-primary" />
                                      <span className="text-xl font-bold">{skin.downloads.toLocaleString()}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-2">Теги</p>
                                    <div className="flex flex-wrap gap-2">
                                      {skin.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="pixel-corners">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-2">Категория</p>
                                    <Badge variant="outline" className="pixel-corners text-base">{skin.category}</Badge>
                                  </div>
                                  <div className="pt-4">
                                    <Button 
                                      className="w-full pixel-corners glow-primary"
                                      size="lg"
                                      onClick={() => handleDownload(skin)}
                                      disabled={downloaded.includes(skin.id)}
                                    >
                                      {downloaded.includes(skin.id) ? (
                                        <>
                                          <Icon name="Check" className="mr-2" />
                                          Скачано
                                        </>
                                      ) : (
                                        <>
                                          <Icon name="Download" className="mr-2" />
                                          Скачать скин
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                            {skin.name}
                          </CardTitle>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {skin.tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="text-xs pixel-corners border-primary/30"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="Download" size={14} />
                              <span>{(skin.downloads / 1000).toFixed(1)}k</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="MessageSquare" size={14} />
                              <span>{skin.reviews}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button 
                            className="w-full pixel-corners"
                            variant={downloaded.includes(skin.id) ? "secondary" : "default"}
                            onClick={() => handleDownload(skin)}
                            disabled={downloaded.includes(skin.id)}
                          >
                            {downloaded.includes(skin.id) ? (
                              <>
                                <Icon name="Check" size={16} className="mr-2" />
                                Скачано
                              </>
                            ) : (
                              <>
                                <Icon name="Download" size={16} className="mr-2" />
                                Скачать
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>


                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Index;