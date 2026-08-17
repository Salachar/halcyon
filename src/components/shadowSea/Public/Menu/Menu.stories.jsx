import Menu from './Menu';

export default {
  title: 'Terminal/Menu',
  component: Menu,
};

export const BlankProps = {
  args: {},
};

// Bar happy hour
export const HappyHour = {
  args: {
    title: 'HAPPY HOUR',
    subtitle: 'Daily 4pm - 7pm',
    signType: 'cocktail',
    categories: [
      {
        name: 'COCKTAILS',
        items: [
          { name: 'Neon Martini', price: '6¤' },
          { name: 'Electric Margarita', price: '6¤' },
          { name: 'Cyber Manhattan', price: '7¤' },
          { name: 'Digital Daiquiri', price: '6¤' },
        ],
      },
      {
        name: 'BEER',
        items: [
          { name: 'Draft Beer', price: '4¤' },
          { name: 'Import Bottles', price: '5¤' },
        ],
      },
      {
        name: 'APPETIZERS',
        items: [
          { name: 'Wings (6pc)', price: '8¤' },
          { name: 'Nachos', price: '9¤' },
          { name: 'Mozzarella Sticks', price: '7¤' },
        ],
      },
    ],
    footer: 'Drink responsibly • 21+ only',
  },
};

// Diner breakfast menu
export const BreakfastMenu = {
  args: {
    title: 'BREAKFAST ALL DAY',
    subtitle: 'Served 24/7',
    signType: 'coffee',
    categories: [
      {
        name: 'CLASSICS',
        items: [
          { name: 'Two Eggs Any Style', price: '8¤' },
          { name: 'Pancake Stack (3)', price: '9¤' },
          { name: 'French Toast', price: '9¤' },
          { name: 'Waffles', price: '10¤' },
        ],
      },
      {
        name: 'OMELETS',
        items: [
          { name: 'Cheese Omelet', price: '10¤' },
          { name: 'Western Omelet', price: '12¤' },
          { name: 'Veggie Omelet', price: '11¤' },
        ],
      },
      {
        name: 'SIDES',
        items: [
          { name: 'Toast', price: '2¤' },
          { name: 'Hash Browns', price: '4¤' },
          { name: 'Bacon/Sausage', price: '5¤' },
        ],
      },
    ],
    footer: 'Free refills on coffee!',
  },
};

// Burger joint
export const BurgerMenu = {
  args: {
    title: "CHROME'S BURGERS",
    subtitle: 'Fresh & Fast',
    signType: 'burger',
    categories: [
      {
        name: 'BURGERS',
        items: [
          { name: 'Classic Burger', price: '12¤' },
          { name: 'Cheeseburger', price: '13¤' },
          { name: 'Bacon Burger', price: '14¤' },
          { name: 'Double Chrome Deluxe', price: '18¤' },
          { name: 'Veggie Burger', price: '12¤' },
        ],
      },
      {
        name: 'SIDES',
        items: [
          { name: 'Fries', price: '5¤' },
          { name: 'Onion Rings', price: '6¤' },
          { name: 'Sweet Potato Fries', price: '6¤' },
          { name: 'Coleslaw', price: '4¤' },
        ],
      },
      {
        name: 'SHAKES',
        items: [
          { name: 'Vanilla', price: '6¤' },
          { name: 'Chocolate', price: '6¤' },
          { name: 'Strawberry', price: '6¤' },
        ],
      },
    ],
    footer: 'All burgers come with lettuce, tomato, pickle',
  },
};

// Coffee shop
export const CoffeeShop = {
  args: {
    title: 'GROUNDED CAFÉ',
    subtitle: 'Locally roasted, lovingly brewed',
    signType: 'coffee',
    categories: [
      {
        name: 'HOT COFFEE',
        items: [
          { name: 'Drip Coffee', price: '3¤' },
          { name: 'Americano', price: '4¤' },
          { name: 'Cappuccino', price: '5¤' },
          { name: 'Latte', price: '5¤' },
          { name: 'Mocha', price: '6¤' },
        ],
      },
      {
        name: 'COLD BREW',
        items: [
          { name: 'Cold Brew', price: '5¤' },
          { name: 'Iced Latte', price: '6¤' },
          { name: 'Iced Mocha', price: '6¤' },
        ],
      },
      {
        name: 'PASTRIES',
        items: [
          { name: 'Croissant', price: '4¤' },
          { name: 'Muffin', price: '4¤' },
          { name: 'Scone', price: '4¤' },
          { name: 'Cinnamon Roll', price: '5¤' },
        ],
      },
    ],
    footer: 'Free WiFi for customers',
  },
};

// Pizza place
export const PizzaMenu = {
  args: {
    title: 'NEON PIZZA',
    subtitle: 'By the slice or whole pie',
    signType: 'sandwich',
    categories: [
      {
        name: 'SPECIALTY PIES',
        items: [
          { name: 'Cheese (14")', price: '18¤' },
          { name: 'Pepperoni (14")', price: '20¤' },
          { name: 'Supreme (14")', price: '24¤' },
          { name: 'Veggie Lovers (14")', price: '22¤' },
          { name: 'Meat Lovers (14")', price: '26¤' },
        ],
      },
      {
        name: 'BY THE SLICE',
        items: [
          { name: 'Cheese Slice', price: '3¤' },
          { name: 'Pepperoni Slice', price: '4¤' },
          { name: 'Daily Special Slice', price: '5¤' },
        ],
      },
      {
        name: 'DRINKS',
        items: [
          { name: 'Soda', price: '2¤' },
          { name: 'Bottled Water', price: '2¤' },
        ],
      },
    ],
    footer: 'Free delivery over 15¤ • Vegan cheese available',
  },
};

// Dive bar
export const DiveBarMenu = {
  args: {
    title: 'THE RUSTY ANCHOR',
    subtitle: 'Drinks & Bites',
    signType: 'cocktail',
    categories: [
      {
        name: 'DRINKS',
        items: [
          { name: 'Domestic Beer', price: '4¤' },
          { name: 'Import Beer', price: '6¤' },
          { name: 'Well Drinks', price: '7¤' },
          { name: 'Call Drinks', price: '9¤' },
          { name: 'Shot', price: '6¤' },
        ],
      },
      {
        name: 'BAR FOOD',
        items: [
          { name: 'Basket of Fries', price: '6¤' },
          { name: 'Chicken Wings (10pc)', price: '12¤' },
          { name: 'Loaded Nachos', price: '10¤' },
          { name: 'Cheeseburger & Fries', price: '14¤' },
        ],
      },
    ],
    footer: 'Cash preferred • Pool table in back',
  },
};

// Sushi restaurant
export const SushiMenu = {
  args: {
    title: 'NEON SUSHI',
    subtitle: 'Fresh Daily',
    signType: 'sandwich',
    categories: [
      {
        name: 'NIGIRI (2 pieces)',
        items: [
          { name: 'Salmon', price: '7¤' },
          { name: 'Tuna', price: '8¤' },
          { name: 'Yellowtail', price: '8¤' },
          { name: 'Eel', price: '9¤' },
          { name: 'Shrimp', price: '6¤' },
        ],
      },
      {
        name: 'SPECIALTY ROLLS',
        items: [
          { name: 'California Roll', price: '10¤' },
          { name: 'Spicy Tuna Roll', price: '12¤' },
          { name: 'Dragon Roll', price: '15¤' },
          { name: 'Rainbow Roll', price: '16¤' },
        ],
      },
      {
        name: 'APPETIZERS',
        items: [
          { name: 'Edamame', price: '5¤' },
          { name: 'Miso Soup', price: '4¤' },
          { name: 'Gyoza (6pc)', price: '8¤' },
        ],
      },
    ],
    footer: 'Lunch specials Mon-Fri 11am-2pm',
  },
};

// Taco truck
export const TacoTruck = {
  args: {
    title: 'TACO NEON',
    subtitle: 'Street tacos done right',
    signType: 'sandwich',
    categories: [
      {
        name: 'TACOS',
        items: [
          { name: 'Carne Asada', price: '4¤' },
          { name: 'Al Pastor', price: '4¤' },
          { name: 'Carnitas', price: '4¤' },
          { name: 'Pollo', price: '3¤' },
          { name: 'Veggie', price: '3¤' },
        ],
      },
      {
        name: 'BURRITOS',
        items: [
          { name: 'Carne Asada Burrito', price: '10¤' },
          { name: 'California Burrito', price: '12¤' },
          { name: 'Bean & Cheese', price: '7¤' },
        ],
      },
      {
        name: 'SIDES',
        items: [
          { name: 'Chips & Salsa', price: '4¤' },
          { name: 'Guacamole', price: '3¤' },
          { name: 'Rice & Beans', price: '5¤' },
        ],
      },
    ],
    footer: 'Cash only • Hot sauce on the side',
  },
};

// Donut shop
export const DonutShop = {
  args: {
    title: 'HOLEY MOLEY',
    subtitle: 'Fresh daily until sold out',
    signType: 'coffee',
    categories: [
      {
        name: 'DONUTS',
        items: [
          { name: 'Glazed', price: '2¤' },
          { name: 'Chocolate Frosted', price: '2.50¤' },
          { name: 'Boston Cream', price: '3¤' },
          { name: 'Jelly Filled', price: '2.50¤' },
          { name: 'Old Fashioned', price: '2¤' },
          { name: 'Specialty (daily)', price: '3.50¤' },
        ],
      },
      {
        name: 'BEVERAGES',
        items: [
          { name: 'Coffee', price: '2¤' },
          { name: 'Cold Brew', price: '4¤' },
          { name: 'Milk', price: '2¤' },
        ],
      },
    ],
    footer: 'Dozens available • Vegan options daily',
  },
};

// Sandwich shop
export const SandwichShop = {
  args: {
    title: 'SUB STATION',
    subtitle: 'Made to order',
    signType: 'sandwich',
    categories: [
      {
        name: 'HOT SUBS',
        items: [
          { name: 'Meatball Sub', price: '10¤' },
          { name: 'Chicken Parm', price: '11¤' },
          { name: 'Philly Cheesesteak', price: '12¤' },
          { name: 'BBQ Pulled Pork', price: '11¤' },
        ],
      },
      {
        name: 'COLD SUBS',
        items: [
          { name: 'Italian Sub', price: '10¤' },
          { name: 'Turkey & Swiss', price: '9¤' },
          { name: 'Ham & Cheese', price: '9¤' },
          { name: 'Veggie Delight', price: '8¤' },
        ],
      },
      {
        name: 'COMBOS',
        items: [
          { name: 'Any Sub + Chips + Drink', price: '+4¤' },
        ],
      },
    ],
    footer: 'Choose from 6" or 12" subs',
  },
};

// Minimal menu
export const MinimalMenu = {
  args: {
    title: 'SPECIALS',
    signType: 'cocktail',
    categories: [
      {
        name: 'TODAY ONLY',
        items: [
          { name: 'House Special', price: '12¤' },
          { name: 'Chef\'s Choice', price: '15¤' },
        ],
      },
    ],
  },
};

// Nightclub bottle service
export const BottleService = {
  args: {
    title: 'VIP BOTTLE SERVICE',
    subtitle: 'Cave Club - Premium lounge',
    signType: 'cocktail',
    categories: [
      {
        name: 'VODKA',
        items: [
          { name: 'Grey Goose', price: '400¤' },
          { name: 'Belvedere', price: '450¤' },
          { name: 'Ketel One', price: '350¤' },
        ],
      },
      {
        name: 'WHISKEY',
        items: [
          { name: 'Jack Daniels', price: '350¤' },
          { name: 'Jameson', price: '380¤' },
          { name: 'Johnnie Walker Black', price: '500¤' },
        ],
      },
      {
        name: 'CHAMPAGNE',
        items: [
          { name: 'Moët & Chandon', price: '600¤' },
          { name: 'Dom Pérignon', price: '1200¤' },
        ],
      },
    ],
    footer: 'Includes mixers & VIP table for 4 hours',
  },
};

// BBQ restaurant
export const BBQMenu = {
  args: {
    title: 'SMOKESTACK BBQ',
    subtitle: 'Slow smoked perfection',
    signType: 'burger',
    categories: [
      {
        name: 'MEATS (per lb)',
        items: [
          { name: 'Brisket', price: '22¤' },
          { name: 'Pulled Pork', price: '18¤' },
          { name: 'Ribs (half rack)', price: '20¤' },
          { name: 'Chicken (half)', price: '15¤' },
          { name: 'Sausage Links', price: '12¤' },
        ],
      },
      {
        name: 'SIDES',
        items: [
          { name: 'Mac & Cheese', price: '6¤' },
          { name: 'Coleslaw', price: '5¤' },
          { name: 'Baked Beans', price: '5¤' },
          { name: 'Cornbread', price: '4¤' },
        ],
      },
    ],
    footer: 'Family platters available • Catering for events',
  },
};

// Ice cream shop
export const IceCreamShop = {
  args: {
    title: 'FROZEN DREAMS',
    subtitle: 'Homemade ice cream',
    signType: 'coffee',
    categories: [
      {
        name: 'SCOOPS',
        items: [
          { name: 'Single Scoop', price: '4¤' },
          { name: 'Double Scoop', price: '7¤' },
          { name: 'Triple Scoop', price: '10¤' },
        ],
      },
      {
        name: 'SPECIALTIES',
        items: [
          { name: 'Sundae', price: '9¤' },
          { name: 'Milkshake', price: '8¤' },
          { name: 'Banana Split', price: '12¤' },
          { name: 'Ice Cream Sandwich', price: '6¤' },
        ],
      },
    ],
    footer: 'Ask about today\'s flavors! • Vegan options available',
  },
};
