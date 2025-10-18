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
  price: number;
  image: string;
  rating: number;
  downloads: number;
  tags: string[];
  reviews: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);

  const skins: Skin[] = [
    {
      id: 1,
      name: 'Легендарный Стив',
      price: 299,
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/646f47b0-4d23-4c58-86c2-1722ee4b597c.jpg',
      rating: 4.8,
      downloads: 15420,
      tags: ['популярное', 'классика', 'новичкам'],
      reviews: 342
    },
    {
      id: 2,
      name: 'Алекс Воин',
      price: 399,
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a4a03380-f036-43a8-ab1e-52bfe1176fac.jpg',
      rating: 4.9,
      downloads: 12350,
      tags: ['эпик', 'воин', 'топ'],
      reviews: 289
    },
    {
      id: 3,
      name: 'Крипер Эдишн',
      price: 499,
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/518c351c-c15e-45bf-ad53-96b5894d957a.jpg',
      rating: 4.7,
      downloads: 9870,
      tags: ['монстр', 'редкое', 'крипер'],
      reviews: 198
    },
    {
      id: 4,
      name: 'Алмазный Рыцарь',
      price: 599,
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/646f47b0-4d23-4c58-86c2-1722ee4b597c.jpg',
      rating: 5.0,
      downloads: 18200,
      tags: ['премиум', 'алмаз', 'рыцарь'],
      reviews: 567
    },
    {
      id: 5,
      name: 'Огненный Маг',
      price: 449,
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a4a03380-f036-43a8-ab1e-52bfe1176fac.jpg',
      rating: 4.6,
      downloads: 7654,
      tags: ['маг', 'огонь', 'магия'],
      reviews: 145
    },
    {
      id: 6,
      name: 'Эндермен Про',
      price: 549,
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/518c351c-c15e-45bf-ad53-96b5894d957a.jpg',
      rating: 4.9,
      downloads: 11230,
      tags: ['эндер', 'темное', 'мистика'],
      reviews: 276
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const toggleCart = (id: number) => {
    setCart(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredSkins = skins.filter(skin =>
    skin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const popularSkins = [...filteredSkins].sort((a, b) => b.downloads - a.downloads);
  const topRatedSkins = [...filteredSkins].sort((a, b) => b.rating - a.rating);

  const displaySkins = activeTab === 'popular' ? popularSkins : 
                       activeTab === 'catalog' ? filteredSkins :
                       activeTab === 'favorites' ? filteredSkins.filter(s => favorites.includes(s.id)) :
                       filteredSkins.filter(s => cart.includes(s.id));

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
              <Button 
                variant="outline" 
                size="icon"
                className="relative hover:glow-primary"
                onClick={() => setActiveTab('cart')}
              >
                <Icon name="ShoppingCart" className={cart.length > 0 ? 'fill-primary text-primary' : ''} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </Button>
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
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card border border-border">
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
            <TabsTrigger value="cart" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ShoppingCart" className="mr-2" size={18} />
              Корзина
            </TabsTrigger>
          </TabsList>

          {['popular', 'catalog', 'favorites', 'cart'].map(tab => (
            <TabsContent key={tab} value={tab}>
              {displaySkins.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-muted-foreground text-lg">
                    {tab === 'favorites' ? 'Нет избранных скинов' : 
                     tab === 'cart' ? 'Корзина пуста' : 
                     'Скины не найдены'}
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
                                  <div className="pt-4">
                                    <div className="text-3xl font-bold text-primary mb-4">{skin.price} ₽</div>
                                    <Button 
                                      className="w-full pixel-corners glow-primary"
                                      onClick={() => toggleCart(skin.id)}
                                    >
                                      {cart.includes(skin.id) ? (
                                        <>
                                          <Icon name="Check" className="mr-2" />
                                          В корзине
                                        </>
                                      ) : (
                                        <>
                                          <Icon name="ShoppingCart" className="mr-2" />
                                          Купить скин
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
                        <CardFooter className="p-4 pt-0 flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary">{skin.price} ₽</div>
                          <Button 
                            size="sm"
                            className="pixel-corners"
                            variant={cart.includes(skin.id) ? "secondary" : "default"}
                            onClick={() => toggleCart(skin.id)}
                          >
                            {cart.includes(skin.id) ? (
                              <>
                                <Icon name="Check" size={16} className="mr-1" />
                                В корзине
                              </>
                            ) : (
                              <>
                                <Icon name="ShoppingCart" size={16} className="mr-1" />
                                Купить
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  {tab === 'cart' && cart.length > 0 && (
                    <div className="mt-8 p-6 bg-card border-2 border-primary pixel-corners glow-primary">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Итого</h3>
                        <div className="text-3xl font-bold text-primary">
                          {skins.filter(s => cart.includes(s.id)).reduce((sum, s) => sum + s.price, 0)} ₽
                        </div>
                      </div>
                      <Button className="w-full pixel-corners glow-primary" size="lg">
                        <Icon name="CreditCard" className="mr-2" />
                        Оформить заказ
                      </Button>
                    </div>
                  )}
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
