# ExploreSQL database schema

## Purpose and source of truth

This project uses a PostgreSQL adaptation of the DVD Rental sample database. The tables are grouped into business schemas rather than kept in one `public` schema.

- **Authoritative DDL:** [`database/schema.sql`](../database/schema.sql)
- **Java mappings:** `src/main/java/com/learnWithFun/exploreSQL/entity/`
- **Database:** `dvdrental`

Use schema-qualified table names in native SQL, for example `customer.customer` and `location.address`. JPQL uses Java entity and field names instead, for example `Customer c join c.address a`.

## Schemas

| Schema | Responsibility | Tables |
|---|---|---|
| `catalog` | Movies and classification | `actor`, `category`, `language`, `film`, `film_actor`, `film_category` |
| `location` | Countries and addresses | `country`, `city`, `address` |
| `inventory` | Stores, staff, physical DVD copies | `store`, `staff`, `inventory` |
| `customer` | Customer accounts | `customer` |
| `rental` | DVD checkout/return history | `rental` |
| `transaction` | Payments | `payment` |

## Relationship map

```text
location.country  1 ──< location.city  1 ──< location.address
                                           ├──< customer.customer
                                           ├──< inventory.staff
                                           └──< inventory.store

catalog.language  1 ──< catalog.film  1 ──< inventory.inventory >── 1 inventory.store
                         ├──< catalog.film_actor >── 1 catalog.actor
                         └──< catalog.film_category >── 1 catalog.category

customer.customer 1 ──< rental.rental >── 1 inventory.inventory
                         │          └───── 1 inventory.staff
                         └──< transaction.payment >── 1 inventory.staff
```

`catalog.film_actor` and `catalog.film_category` are bridge tables. Their two foreign keys together form a composite primary key.

## Tables

### `catalog.actor`

Stores actors. One actor can be linked to many films through `catalog.film_actor`.

| Column | Type | Rules |
|---|---|---|
| `actor_id` | integer | Primary key, generated identity |
| `first_name` | varchar(45) | Required |
| `last_name` | varchar(45) | Required |
| `last_update` | timestamptz | Required; maintained by trigger/application |

### `catalog.category`

Movie categories such as Action or Comedy. A category has many films through `catalog.film_category`.

| Column | Type | Rules |
|---|---|---|
| `category_id` | integer | Primary key, generated identity |
| `name` | varchar(25) | Required |
| `last_update` | timestamptz | Required |

### `catalog.language`

Supported film languages.

| Column | Type | Rules |
|---|---|---|
| `language_id` | integer | Primary key, generated identity |
| `name` | varchar(20) | Required |
| `last_update` | timestamptz | Required |

### `catalog.film`

Master record for a movie. It does **not** represent a physical DVD; `inventory.inventory` does that.

| Column | Type | Rules |
|---|---|---|
| `film_id` | integer | Primary key, generated identity |
| `title` | varchar(255) | Required |
| `description` | text | Optional |
| `release_year` | integer | Optional |
| `language_id` | integer | Required FK to `catalog.language` |
| `rental_duration` | smallint | Required, days |
| `rental_rate` | numeric(4,2) | Required |
| `length` | smallint | Required, minutes |
| `replacement_cost` | numeric(5,2) | Required |
| `rating` | `public.mpaa_rating` | Optional MPAA rating |
| `special_features` | text[] | Optional PostgreSQL array |
| `fulltext` | tsvector | Search index value; database-maintained |
| `last_update` | timestamptz | Required |

### `catalog.film_actor`

Many-to-many bridge between films and actors.

| Column | Type | Rules |
|---|---|---|
| `actor_id` | integer | PK and FK to `catalog.actor` |
| `film_id` | integer | PK and FK to `catalog.film` |
| `last_update` | timestamptz | Required |

### `catalog.film_category`

Many-to-many bridge between films and categories.

| Column | Type | Rules |
|---|---|---|
| `film_id` | integer | PK and FK to `catalog.film` |
| `category_id` | integer | PK and FK to `catalog.category` |
| `last_update` | timestamptz | Required |

### `location.country`, `location.city`, and `location.address`

Location hierarchy: a country has cities; a city has addresses; one address can be used by customers, staff, or stores.

| Table | Primary key | Important foreign key | Main business fields |
|---|---|---|---|
| `location.country` | `country_id` | — | `country` |
| `location.city` | `city_id` | `country_id → location.country` | `city` |
| `location.address` | `address_id` | `city_id → location.city` | `address`, `address2`, `district`, `postal_code`, `phone` |

All three tables have `last_update`.

### `inventory.store` and `inventory.staff`

`store` and `staff` have a circular relationship:

- `staff.store_id` says where a staff member works.
- `store.manager_staff_id` says which staff member manages a store.

The manager column is unique, so a staff member can manage at most one store.

| Table | Primary key | Important foreign keys |
|---|---|---|
| `inventory.store` | `store_id` | `manager_staff_id → inventory.staff`, `address_id → location.address` |
| `inventory.staff` | `staff_id` | `store_id → inventory.store`, `address_id → location.address` |

### `inventory.inventory`

Represents one physical copy of a film held at a store.

| Column | Type | Rules |
|---|---|---|
| `inventory_id` | integer | Primary key, generated identity |
| `film_id` | integer | Required FK to `catalog.film` |
| `store_id` | integer | Required FK to `inventory.store` |
| `last_update` | timestamptz | Required |

Example: one `catalog.film` row for *Avatar* can have many `inventory.inventory` rows because several stores may own several copies.

### `customer.customer`

Customer account and contact information.

| Column | Type | Rules |
|---|---|---|
| `customer_id` | integer | Primary key, generated identity |
| `store_id` | integer | Required FK to `inventory.store` |
| `address_id` | integer | Required FK to `location.address` |
| `first_name`, `last_name` | varchar(45) | Required |
| `email` | varchar(50) | Optional |
| `activebool` | boolean | Required; current active flag |
| `active` | integer | Optional legacy active flag |
| `create_date` | date | Required; set when customer is created |
| `last_update` | timestamptz | Updated by application/trigger |

### `rental.rental`

Records a customer borrowing and returning one physical inventory item.

| Column | Type | Rules |
|---|---|---|
| `rental_id` | integer | Primary key, generated identity |
| `rental_date` | timestamptz | Required |
| `inventory_id` | integer | Required FK to `inventory.inventory` |
| `customer_id` | integer | Required FK to `customer.customer` |
| `return_date` | timestamptz | Null until returned |
| `staff_id` | integer | Required FK to `inventory.staff` |
| `last_update` | timestamptz | Required |

The combination of `rental_date`, `inventory_id`, and `customer_id` is unique.

### `transaction.payment`

Records a payment collected for a rental.

| Column | Type | Rules |
|---|---|---|
| `payment_id` | integer | Primary key, generated identity |
| `customer_id` | integer | Required FK to `customer.customer` |
| `staff_id` | integer | Required FK to `inventory.staff` |
| `rental_id` | integer | Required FK to `rental.rental` |
| `amount` | numeric(5,2) | Required |
| `payment_date` | timestamptz | Required |

## Query examples

### Customer address and country (native PostgreSQL SQL)

```sql
select
    concat(c.first_name, ' ', c.last_name) as customer_name,
    a.address,
    city.city,
    country.country
from customer.customer c
join location.address a on a.address_id = c.address_id
join location.city city on city.city_id = a.city_id
join location.country country on country.country_id = city.country_id
where c.customer_id = :customerId;
```

### All payments for one customer

```sql
select payment.payment_id, payment.amount, payment.payment_date, payment.rental_id
from "transaction".payment payment
where payment.customer_id = :customerId
order by payment.payment_date desc;
```

## Application notes

- JPA `@ManyToOne` is `LAZY` in this project; use DTOs at API boundaries rather than returning entities as JSON.
- `GenerationType.IDENTITY` relies on PostgreSQL identity sequences. If data was imported with explicit IDs, reset a sequence to `max(id)` before inserting new data.
- `@PrePersist`/`@PreUpdate` in `AuditedEntity` populate `last_update`; the DDL also provides a trigger for SQL inserts/updates outside JPA.
