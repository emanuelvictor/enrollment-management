SET search_path = public;

CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION FILTER(needles text, VARIADIC haystacks text [])
  RETURNS boolean AS $$
SELECT trim(needles) IS NULL OR trim(needles) = '' OR EXISTS(
    SELECT DISTINCT 1
    FROM unnest(haystacks) haystack,
          unnest(string_to_array(needles, ',')) needle
    WHERE unaccent(haystack) ILIKE '%' || unaccent(needle) || '%');
$$ LANGUAGE SQL;

create table class (id bigint generated by default as identity, deleted boolean not null, name varchar(255) not null, professor_id bigint, primary key (id));
create table enrollment (id bigint generated by default as identity, clazz_id bigint not null, student_id bigint not null, primary key (id));
create table people (id bigint generated by default as identity, deleted boolean not null, document varchar(255) not null, email varchar(255) not null, name varchar(255) not null, primary key (id));
alter table class drop constraint if exists UK_k9k2qotp6nupi0e2ahpl0bhrp;
alter table class add constraint UK_k9k2qotp6nupi0e2ahpl0bhrp unique (name);
alter table enrollment drop constraint if exists UKhxve66fhqtk9bpem9v8peki1c;
alter table enrollment add constraint UKhxve66fhqtk9bpem9v8peki1c unique (student_id, clazz_id);
alter table people drop constraint if exists UK_pqnbgw6w4sou7nsxhoa43ip8;
alter table people add constraint UK_pqnbgw6w4sou7nsxhoa43ip8 unique (document);
alter table people drop constraint if exists UK_sw73blrfiqs1etfk8qecdieyx;
alter table people add constraint UK_sw73blrfiqs1etfk8qecdieyx unique (email);
alter table class add constraint FK6w16mby3bl6lttrdfdagqbgx6 foreign key (professor_id) references people;
alter table enrollment add constraint FK6201sehaqlqx7d17x215gvl3u foreign key (clazz_id) references class;
alter table enrollment add constraint FKbcm01ai769v3plnjrir6xgi9l foreign key (student_id) references people;