DROP TABLE menuCategories CASCADE;
DROP TABLE menuItems CASCADE;

CREATE TABLE menuCategories(
    id serial PRIMARY KEY,
    name text
);

CREATE TABLE menuItems(
    id serial PRIMARY KEY,
    name text,
    description text,
    calories integer,
    price integer,
    menu_categories_id integer,
        FOREIGN KEY(menu_categories_id) REFERENCES menuCategories(id) 
            ON DELETE CASCADE
);