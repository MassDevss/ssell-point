

create database if not exists tiburon_sp;

create table if not exists tiburon_sp.clientes
(
    id        int auto_increment
        primary key,
    nombre    varchar(80)  not null,
    telefono  varchar(10)  not null,
    direccion varchar(255) not null
);

create table if not exists tiburon_sp.orders
(
    id       bigint auto_increment
        primary key,
    date     date          not null,
    time     time          not null,
    products varchar(2000) not null,
    address  varchar(600)  not null,
    cost     int           not null,
		pay_method varchar(100) not null
);

create table if not exists products_types (
    id int not null auto_increment primary key,
    name varchar(80) not null
);

create table if not exists products (
    id int not null auto_increment primary key,
    name varchar(60) not null,
    price double not null,
    disposable int not null,
    product_type int not null,

    foreign key type_of_product (product_type) REFERENCES products_types (id)
);


use tiburon_sp;

insert into products_types (name) values
                                      ('Burgers'),
                                      ('Pollo'),
                                      ('Dogos'),
                                      ('Papas'),
                                      ('Extras'),
                                      ('Promos'),
                                      ('Tortas');

INSERT INTO products (name, price, product_type, disposable)
VALUES
    ('Tiburon', 125, 1, 1),
    ('Chipocluda', 129, 1, 1),
    ('ChesseBurger', 195, 1, 1),
    ('CrispyChesse', 149, 1, 1),
    ('ChickenFried', 110, 1, 1),
    ('Mexicana', 135, 1, 1),
    ('Clasica', 95, 1, 1),
    ('FungusChicken', 140, 1, 1),
    ('ChoriBurger', 190, 1, 1),
    ('BonelessBurger', 105, 1, 1),
    ('TiburonDoble', 210, 1, 1),
    ('BonelessChicos', 105, 2, 1),
    ('BonelessMedianos', 135, 2, 1),
    ('BonelessGrandes', 189, 2, 1),
    ('Alitas', 115, 2, 1),
    ('Tibu', 99, 6, 1),
    ('Chipo', 99, 6, 1),
    ('Boneless-med', 99, 6, 1),
    ('PromoTibus', 220, 6, 2),
    ('PromoChipos', 225, 6, 2),
    ('Sampler', 360, 6, 3),
    ('2-BonelessBurger', 180, 6, 2),
    ('Boneless-Bebida', 180, 6, 2),
    ('Clasica-Boneless', 160, 6, 1),
    ('Chori-Chesse', 340, 6, 2),
    ('HotDog', 40, 3, 1),
    ('Salchipapas', 70, 3, 1),
    ('HotDog-papas', 55, 3, 1),
    ('Philadelphia', 55, 3, 1),
    ('Doble-salchicha', 55, 3, 1),
    ('Ranchero', 60, 3, 1),
    ('Aguacatuda', 70, 7, 1),
    ('Torta-Pio', 85, 7, 1),
    ('Campechana', 120, 7, 1),
    ('Millan', 99, 7, 1),
    ('Gajo', 50, 4, 1),
    ('Francesas', 40, 4, 1),
    ('Papas-Pio', 105, 4, 1),
    ('Aros-de-cebolla', 50, 4, 1),
    ('Papas-Tiburon', 135, 4, 1),
    ('Agua-Te', 20, 5, 0),
    ('Refresco', 25, 5, 0),
    ('Agua-litro', 30, 5, 0),
    ('Carne-Extra', 35, 5, 0),
    ('Queso-Extra', 30, 5, 0),
    ('Tozino-Extra', 10, 5, 0),
    ('Aderezo-Extra', 5, 5, 0),
    ('Salsa-Extra', 10, 5, 0),
    ('Papas-extra', 20, 5, 0);

