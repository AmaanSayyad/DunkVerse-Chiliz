// Define the structure of story data
export interface StorySlide {
  id: number;
  image: string;
  caption?: string;
  timestamp?: string;
  type?: 'image' | 'video' | 'text';
}

export interface Story {
  id: number;
  title: string;
  avatar: string;
  image: string; // Fallback image
  isActive: boolean;
  slides: StorySlide[];
  onClick?: () => void;
}

// Mock data for stories with multiple slides
export const storyData: Story[] = [
  {
    id: 1,
    title: 'New York Knicks',
    avatar: '/images/story4.png',
    image: '/images/story4.png',
    isActive: true,
    slides: [
      {
        id: 1,
        image: '/images/story4.png',
        caption: '🏀 Knicks vs Lakers tonight! Who\'s ready for this epic showdown? #NYC #Basketball',
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        image: '/images/lebron-james.png',
        caption: 'LeBron James warming up! This is going to be 🔥 #LeBron #Lakers',
        timestamp: '1 hour ago'
      },
      {
        id: 3,
        image: '/images/players-running.png',
        caption: 'Game time! Let\'s go Knicks! 🏆 #GameDay #KnicksNation',
        timestamp: '30 min ago'
      }
    ]
  },
  {
    id: 2,
    title: 'Miami Heat',
    avatar: '/images/story2.png',
    image: '/images/story2.png',
    isActive: false,
    slides: [
      {
        id: 1,
        image: '/images/story2.png',
        caption: '🔥 Heat culture is real! Practice makes perfect #HeatCulture #Miami',
        timestamp: '4 hours ago'
      },
      {
        id: 2,
        image: '/images/giannis-antetokounmpo.png',
        caption: 'Preparing for the Bucks matchup! This will be intense 💪 #HeatVsBucks',
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 3,
    title: 'Brooklyn Nets',
    avatar: '/images/story3.png',
    image: '/images/story3.png',
    isActive: false,
    slides: [
      {
        id: 1,
        image: '/images/story3.png',
        caption: 'Nets practice session! Building chemistry on and off the court 🏀 #BrooklynNets',
        timestamp: '5 hours ago'
      },
      {
        id: 2,
        image: '/images/kevin-duran.png',
        caption: 'KD showing off his skills! Unstoppable when he\'s on 🔥 #KevinDurant',
        timestamp: '4 hours ago'
      },
      {
        id: 3,
        image: '/images/demo-player.png',
        caption: 'Team meeting before the big game! Unity is strength 💪 #NetsFamily',
        timestamp: '2 hours ago'
      }
    ]
  },
  {
    id: 4,
    title: 'Detroit Pistons',
    avatar: '/images/story1.png',
    image: '/images/story1.png',
    isActive: true,
    slides: [
      {
        id: 1,
        image: '/images/story1.png',
        caption: 'Pistons getting ready for tonight\'s game! Motor City pride 🚗 #DetroitBasketball',
        timestamp: '1 hour ago'
      },
      {
        id: 2,
        image: '/images/devin-booker.png',
        caption: 'Facing the Suns tonight! Devin Booker vs our defense 🌟 #PistonsVsSuns',
        timestamp: '45 min ago'
      }
    ]
  },
  {
    id: 5,
    title: 'Los Angeles Lakers',
    avatar: '/images/lebron-james.png',
    image: '/images/lebron-james.png',
    isActive: true,
    slides: [
      {
        id: 1,
        image: '/images/lebron-james.png',
        caption: 'King James in the building! 👑 #LeBron #Lakers #KingJames',
        timestamp: '30 min ago'
      },
      {
        id: 2,
        image: '/images/players-running.png',
        caption: 'Lakers warm-up routine! Championship mindset 🏆 #LakersNation',
        timestamp: '15 min ago'
      }
    ]
  },
  {
    id: 6,
    title: 'Golden State Warriors',
    avatar: '/images/demo-profile.png',
    image: '/images/demo-profile.png',
    isActive: false,
    slides: [
      {
        id: 1,
        image: '/images/demo-profile.png',
        caption: 'Warriors practice! Splash Brothers getting ready 💦 #Warriors #SplashBrothers',
        timestamp: '6 hours ago'
      }
    ]
  }
];
