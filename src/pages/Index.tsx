import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Wallpaper {
  id: number;
  title: string;
  image: string;
  category: string;
  tags: string[];
  downloads: number;
  resolutions: {
    desktop: string[];
    mobile: string[];
  };
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResolution, setSelectedResolution] = useState<'desktop' | 'mobile'>('desktop');

  const wallpapers: Wallpaper[] = [
    {
      id: 1,
      title: 'Горный Закат',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/9ed07efa-dff6-4498-a230-b6676ee442a0.jpg',
      category: 'Природа',
      tags: ['горы', 'закат', 'природа'],
      downloads: 15420,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    },
    {
      id: 2,
      title: 'Абстрактная Геометрия',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a82e7f30-fed0-4eff-b006-f0109637d593.jpg',
      category: 'Абстракция',
      tags: ['абстракция', 'геометрия', 'минимализм'],
      downloads: 12350,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    },
    {
      id: 3,
      title: 'Космическая Туманность',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/8c79aa19-3380-4653-96d4-0adf77853c51.jpg',
      category: 'Космос',
      tags: ['космос', 'галактика', 'звезды'],
      downloads: 18900,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    },
    {
      id: 4,
      title: 'Ночной Лес',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/9ed07efa-dff6-4498-a230-b6676ee442a0.jpg',
      category: 'Природа',
      tags: ['лес', 'ночь', 'природа'],
      downloads: 9870,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    },
    {
      id: 5,
      title: 'Неоновый Город',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a82e7f30-fed0-4eff-b006-f0109637d593.jpg',
      category: 'Город',
      tags: ['город', 'неон', 'ночь'],
      downloads: 14200,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    },
    {
      id: 6,
      title: 'Глубокий Космос',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/8c79aa19-3380-4653-96d4-0adf77853c51.jpg',
      category: 'Космос',
      tags: ['космос', 'планеты', 'вселенная'],
      downloads: 16780,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    },
    {
      id: 7,
      title: 'Океанские Волны',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/9ed07efa-dff6-4498-a230-b6676ee442a0.jpg',
      category: 'Природа',
      tags: ['океан', 'волны', 'море'],
      downloads: 11200,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    },
    {
      id: 8,
      title: 'Цветная Абстракция',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a82e7f30-fed0-4eff-b006-f0109637d593.jpg',
      category: 'Абстракция',
      tags: ['цвета', 'абстракция', 'искусство'],
      downloads: 13450,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    },
    {
      id: 9,
      title: 'Млечный Путь',
      image: 'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/8c79aa19-3380-4653-96d4-0adf77853c51.jpg',
      category: 'Космос',
      tags: ['галактика', 'звезды', 'млечный путь'],
      downloads: 19500,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    }
  ];

  const generateMoreWallpapers = () => {
    const titles = [
      'Северное Сияние', 'Тропический Пляж', 'Зимний Лес', 'Городской Пейзаж', 'Пустыня на Рассвете',
      'Звездное Небо', 'Горное Озеро', 'Киберпанк Город', 'Лавандовое Поле', 'Туманное Утро',
      'Космический Корабль', 'Водопад в Джунглях', 'Неоновые Огни', 'Осенний Парк', 'Луна и Звезды',
      'Розовый Закат', 'Абстрактные Формы', 'Голубая Лагуна', 'Ночной Мегаполис', 'Красная Планета',
      'Зеленые Холмы', 'Фиолетовая Туманность', 'Белые Облака', 'Золотой Час', 'Синий Океан',
      'Черная Дыра', 'Радужный Градиент', 'Снежные Вершины', 'Пальмы на Закате', 'Космическая Станция',
      'Желтые Цветы', 'Городские Небоскребы', 'Розовое Небо', 'Зеленый Лес', 'Красный Закат',
      'Голубое Море', 'Фиолетовые Облака', 'Оранжевый Рассвет', 'Серые Горы', 'Белый Песок',
      'Темный Космос', 'Яркие Звезды', 'Тихая Река', 'Бурное Море', 'Спокойное Озеро',
      'Ледяная Пещера', 'Огненный Шар', 'Водная Гладь', 'Каменный Берег', 'Песчаные Дюны',
      'Зеленая Долина', 'Синяя Бездна', 'Красные Скалы', 'Желтая Пустыня', 'Фиолетовый Закат',
      'Розовая Луна', 'Оранжевые Облака', 'Серебряные Звезды', 'Золотые Лучи', 'Бирюзовое Море',
      'Изумрудный Лес', 'Рубиновый Закат', 'Сапфировое Небо', 'Аметистовая Ночь', 'Янтарный Рассвет',
      'Жемчужные Облака', 'Коралловый Риф', 'Малахитовая Зелень', 'Топазовое Солнце', 'Опаловые Переливы',
      'Гранатовый Восход', 'Лазурный Берег', 'Нефритовая Долина', 'Алмазная Пыль', 'Кварцевый Блеск',
      'Агатовые Узоры', 'Обсидиановая Ночь', 'Мраморные Облака', 'Гранитные Скалы', 'Базальтовый Берег',
      'Известняковые Утесы', 'Песчаниковый Каньон', 'Сланцевые Горы', 'Кристальная Вода', 'Магматическая Лава',
      'Рыжий Лис', 'Белый Медведь', 'Синий Кит', 'Розовый Фламинго', 'Золотой Орел',
      'Черная Пантера', 'Зеленая Игуана', 'Фиолетовая Бабочка', 'Оранжевый Тигр', 'Серый Волк',
      'Красный Попугай', 'Желтый Лев', 'Голубой Дельфин', 'Коричневый Медведь', 'Белый Заяц',
      'Пятнистый Леопард', 'Полосатая Зебра', 'Яркий Павлин', 'Морская Черепаха', 'Летящий Сокол',
      'Спящий Коала', 'Прыгающий Кенгуру', 'Плывущая Акула', 'Ленивец на Ветке', 'Пингвин на Льду',
      'Жираф в Саванне', 'Слон у Водопоя', 'Обезьяна в Джунглях', 'Колибри у Цветка', 'Сова на Дереве',
      'Кошка в Окне', 'Собака на Пляже', 'Лошадь в Поле', 'Олень в Лесу', 'Енот у Реки',
      'Белка с Орехом', 'Ёж в Траве', 'Лебедь на Озере', 'Чайка над Морем', 'Краб на Песке',
      'Медуза в Воде', 'Скат в Океане', 'Морской Конёк', 'Осьминог в Глубине', 'Рыба-Клоун',
      'Коралловый Сад', 'Тропический Лес', 'Бамбуковая Роща', 'Сакура в Цвету', 'Подсолнухи',
      'Маковое Поле', 'Тюльпаны в Саду', 'Розовый Сад', 'Кактусовая Пустыня', 'Пальмовый Пляж',
      'Неоновый Дракон', 'Хамелеон на Листе', 'Белый Тигр', 'Красный Дракон', 'Синяя Птица',
      'Золотая Рыбка', 'Изумрудный Змей', 'Фиолетовый Скорпион', 'Оранжевая Лиса', 'Серебряный Дельфин',
      'Алый Закат', 'Лиловое Поле', 'Мятное Небо', 'Персиковый Рассвет', 'Бирюзовый Водопад',
      'Коралловые Рифы', 'Лимонный Сад', 'Малиновый Горизонт', 'Индиго Ночь', 'Янтарное Поле',
      'Лазуритовое Море', 'Нефритовый Лес', 'Рубиновые Горы', 'Сапфировый Океан', 'Топазовые Звезды',
      'Аквамариновая Волна', 'Аметистовое Небо', 'Изумрудная Долина', 'Жемчужный Пляж', 'Гранатовый Восход'
    ];

    const categories_list = ['Природа', 'Космос', 'Абстракция', 'Город', 'Животные', 'Минимализм', 'Фантастика'];
    const images = [
      'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/9ed07efa-dff6-4498-a230-b6676ee442a0.jpg',
      'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/a82e7f30-fed0-4eff-b006-f0109637d593.jpg',
      'https://cdn.poehali.dev/projects/37b9b65e-8fb2-4320-88bb-793024bdfd30/files/8c79aa19-3380-4653-96d4-0adf77853c51.jpg'
    ];

    return titles.map((title, index) => ({
      id: 10 + index,
      title,
      image: images[index % 3],
      category: categories_list[index % categories_list.length],
      tags: [title.toLowerCase().split(' ')[0], title.toLowerCase().split(' ')[1] || 'обои', 'hd'],
      downloads: Math.floor(Math.random() * 20000) + 5000,
      resolutions: {
        desktop: ['1920x1080', '2560x1440', '3840x2160'],
        mobile: ['1080x1920', '1440x2560']
      }
    }));
  };

  const allWallpapers = [...wallpapers, ...generateMoreWallpapers()];

  const categories = ['all', 'Природа', 'Космос', 'Абстракция', 'Город', 'Животные', 'Минимализм', 'Фантастика'];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleDownload = (wallpaper: Wallpaper, resolution: string) => {
    const link = document.createElement('a');
    link.href = wallpaper.image;
    link.download = `${wallpaper.title}_${resolution}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredWallpapers = allWallpapers
    .filter(wp => activeCategory === 'all' || wp.category === activeCategory)
    .filter(wp => 
      wp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const popularWallpapers = [...filteredWallpapers].sort((a, b) => b.downloads - a.downloads);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🖼️</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  WallpaperHub
                </h1>
                <p className="text-xs text-muted-foreground">Обои для всех устройств</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                <Icon name="Download" className="text-purple-600" size={18} />
                <span className="text-sm font-semibold">{filteredWallpapers.length} обоев</span>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="relative"
                onClick={() => setActiveCategory('all')}
              >
                <Icon name="Heart" className={favorites.length > 0 ? 'fill-pink-500 text-pink-500' : ''} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex gap-3 flex-col md:flex-row">
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Поиск обоев по названию или тегам..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedResolution} onValueChange={(v) => setSelectedResolution(v as 'desktop' | 'mobile')}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop">
                  <div className="flex items-center gap-2">
                    <Icon name="Monitor" size={16} />
                    <span>Для ПК</span>
                  </div>
                </SelectItem>
                <SelectItem value="mobile">
                  <div className="flex items-center gap-2">
                    <Icon name="Smartphone" size={16} />
                    <span>Для телефона</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="whitespace-nowrap"
            >
              {cat === 'all' ? '🌟 Все' : cat}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="popular">
              <Icon name="TrendingUp" className="mr-2" size={18} />
              Популярные
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Icon name="Clock" className="mr-2" size={18} />
              Недавние
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularWallpapers.map((wallpaper) => (
                <Card 
                  key={wallpaper.id} 
                  className="overflow-hidden group hover:shadow-xl transition-shadow"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative cursor-pointer aspect-video overflow-hidden bg-slate-200">
                        <img 
                          src={wallpaper.image} 
                          alt={wallpaper.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(wallpaper.id);
                            }}
                          >
                            <Icon 
                              name="Heart" 
                              size={16}
                              className={favorites.includes(wallpaper.id) ? 'fill-pink-500 text-pink-500' : ''}
                            />
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <Badge variant="secondary" className="mb-2">{wallpaper.category}</Badge>
                          <h3 className="text-white font-bold text-lg">{wallpaper.title}</h3>
                          <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                            <Icon name="Download" size={14} />
                            <span>{(wallpaper.downloads / 1000).toFixed(1)}k</span>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{wallpaper.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                          <img 
                            src={wallpaper.image} 
                            alt={wallpaper.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Категория</p>
                            <Badge variant="outline">{wallpaper.category}</Badge>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Теги</p>
                            <div className="flex flex-wrap gap-2">
                              {wallpaper.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Скачиваний</p>
                            <div className="flex items-center gap-2">
                              <Icon name="Download" className="text-purple-600" />
                              <span className="text-xl font-bold">{wallpaper.downloads.toLocaleString()}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-3">
                              Разрешения {selectedResolution === 'desktop' ? 'для ПК' : 'для телефона'}
                            </p>
                            <div className="space-y-2">
                              {wallpaper.resolutions[selectedResolution].map(res => (
                                <Button
                                  key={res}
                                  className="w-full justify-between"
                                  variant="outline"
                                  onClick={() => handleDownload(wallpaper, res)}
                                >
                                  <span>{res}</span>
                                  <Icon name="Download" size={16} />
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {wallpaper.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWallpapers.map((wallpaper) => (
                <Card 
                  key={wallpaper.id} 
                  className="overflow-hidden group hover:shadow-xl transition-shadow"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative cursor-pointer aspect-video overflow-hidden bg-slate-200">
                        <img 
                          src={wallpaper.image} 
                          alt={wallpaper.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(wallpaper.id);
                            }}
                          >
                            <Icon 
                              name="Heart" 
                              size={16}
                              className={favorites.includes(wallpaper.id) ? 'fill-pink-500 text-pink-500' : ''}
                            />
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <Badge variant="secondary" className="mb-2">{wallpaper.category}</Badge>
                          <h3 className="text-white font-bold text-lg">{wallpaper.title}</h3>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{wallpaper.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                          <img 
                            src={wallpaper.image} 
                            alt={wallpaper.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-3">
                              Разрешения {selectedResolution === 'desktop' ? 'для ПК' : 'для телефона'}
                            </p>
                            <div className="space-y-2">
                              {wallpaper.resolutions[selectedResolution].map(res => (
                                <Button
                                  key={res}
                                  className="w-full justify-between"
                                  variant="outline"
                                  onClick={() => handleDownload(wallpaper, res)}
                                >
                                  <span>{res}</span>
                                  <Icon name="Download" size={16} />
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {wallpaper.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;