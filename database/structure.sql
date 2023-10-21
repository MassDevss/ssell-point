

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
