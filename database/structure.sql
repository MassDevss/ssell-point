

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
    cost     int           not null
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