DELETE FROM menuCategories;
DELETE FROM menuItems;

INSERT INTO menuCategories(name)
VALUES('Beverages'),
        ('Chicken'),
        ('Steak'),
        ('Appetizers'),
        ('Burritos'),
        ('Desserts');

     


INSERT INTO menuItems(name, description, calories, price, menu_categories_id)
VALUES('Pepsi', 'a softdrink', 320, 2, 1),
      ('horchata','a cinnamon delight', 350, 4, 1),
      ('Pechuga Frita', 'grilled chicken breast topped with sauteed onions and white cheese. Served with rice, beans, guacomole salad and flour tortillas', 1250, 12, 2),
      ('pollo loco', 'marinated chicken tenders cooked in our special red tomato based sauce', 1250, 14, 2),
      ('cheese steak', ' rib eye steak grilled and topped with suateed onions and cheese sauce', 1200, 12, 3),
      ('flan', 'dessert type deliciousness', 600, 5, 6),
      ('burrito grande','twelve inch tortilla filled with chicken, beef, beans, rice, lettuce, and sourcream topped with cheese sauce', 900, 13, 5),
      ('chips and salsa', 'basket of chips with our house salsa', 300, 1, 4);
