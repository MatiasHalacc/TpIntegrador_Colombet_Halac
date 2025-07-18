--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.0

-- Started on 2025-07-18 10:46:13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4847 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: event_enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_enrollments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_enrollments_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: event_enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_enrollments (
    id integer DEFAULT nextval('public.event_enrollments_id_seq'::regclass) NOT NULL,
    id_event integer NOT NULL,
    id_user integer NOT NULL,
    description character varying NOT NULL,
    registration_date_time date NOT NULL,
    attended boolean NOT NULL,
    observations character varying NOT NULL,
    rating integer NOT NULL
);


ALTER TABLE public.event_enrollments OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16406)
-- Name: event_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_locations_id_seq OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16407)
-- Name: event_locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_locations (
    id integer DEFAULT nextval('public.event_locations_id_seq'::regclass) NOT NULL,
    id_location integer NOT NULL,
    name character varying NOT NULL,
    full_adress character varying NOT NULL,
    max_capacity integer NOT NULL,
    latitude integer NOT NULL,
    longitude integer NOT NULL
);


ALTER TABLE public.event_locations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16413)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16414)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer DEFAULT nextval('public.events_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    id_event_location integer NOT NULL,
    start_date date NOT NULL,
    duration_in_minutes integer NOT NULL,
    price integer NOT NULL,
    enables_for_enrollment boolean NOT NULL,
    max_assistance integer NOT NULL,
    id_creator_user integer NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16420)
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_seq OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16421)
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id integer DEFAULT nextval('public.locations_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    id_province integer NOT NULL,
    latitude integer NOT NULL,
    longitude integer NOT NULL,
    max_capacity integer
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16427)
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.provinces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.provinces_id_seq OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16428)
-- Name: provinces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provinces (
    id integer DEFAULT nextval('public.provinces_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    full_name character varying NOT NULL,
    latitude integer NOT NULL,
    longitude integer NOT NULL,
    display_order integer NOT NULL
);


ALTER TABLE public.provinces OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16434)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16435)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4831 (class 0 OID 16400)
-- Dependencies: 216
-- Data for Name: event_enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_enrollments VALUES (1, 1, 2, 'Asistente confirmado.', '2025-07-01', true, 'Excelente show.', 5);
INSERT INTO public.event_enrollments VALUES (2, 2, 3, 'Compra de entrada anticipada.', '2025-07-02', false, 'Aun no asistió.', 0);
INSERT INTO public.event_enrollments VALUES (3, 3, 4, 'Registrado online.', '2025-07-03', true, 'Muy inspirador.', 4);
INSERT INTO public.event_enrollments VALUES (4, 4, 5, 'Compra presencial.', '2025-07-04', false, 'Esperando el evento.', 0);
INSERT INTO public.event_enrollments VALUES (5, 5, 1, 'Invitación especial.', '2025-07-05', true, 'Muy interesante.', 5);


--
-- TOC entry 4833 (class 0 OID 16407)
-- Dependencies: 218
-- Data for Name: event_locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_locations VALUES (1, 1, 'Centro Cultural LP', 'Calle 10 N°123, La Plata', 200, -34, -58);
INSERT INTO public.event_locations VALUES (2, 2, 'Teatro Real', 'Av. Vélez Sarsfield 365, Córdoba', 500, -31, -64);
INSERT INTO public.event_locations VALUES (3, 3, 'Complejo Cultural Rosario', 'Bv. Oroño 750, Rosario', 300, -32, -60);
INSERT INTO public.event_locations VALUES (4, 4, 'Auditorio Mendoza', 'San Martín 500, Mendoza', 400, -32, -68);
INSERT INTO public.event_locations VALUES (5, 5, 'Centro de Convenciones Salta', 'Belgrano 100, Salta', 600, -24, -65);


--
-- TOC entry 4835 (class 0 OID 16414)
-- Dependencies: 220
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events VALUES (1, 'Concierto de Rock', 'Show en vivo de bandas locales.', 1, '2025-07-15', 120, 1500, true, 200, 1);
INSERT INTO public.events VALUES (2, 'Obra de Teatro', 'Teatro contemporáneo.', 2, '2025-08-10', 90, 1200, true, 500, 2);
INSERT INTO public.events VALUES (3, 'Charla TED', 'Conferencias sobre innovación.', 3, '2025-09-05', 60, 0, true, 300, 3);
INSERT INTO public.events VALUES (4, 'Festival Folklórico', 'Música y danza tradicional.', 4, '2025-10-20', 180, 2000, true, 400, 4);
INSERT INTO public.events VALUES (5, 'Seminario Tecnológico', 'Jornada sobre nuevas tecnologías.', 5, '2025-11-25', 240, 2500, true, 600, 5);
INSERT INTO public.events VALUES (13, 'Concierto', 'el mejor concierto que existe', 1, '2025-07-20', 120, 30, false, 100, 10);
INSERT INTO public.events VALUES (14, 'Show', 'el segundo mejor concierto que existe', 2, '2025-08-20', 125, 300, true, 200, 10);


--
-- TOC entry 4837 (class 0 OID 16421)
-- Dependencies: 222
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.locations VALUES (1, 'La Plata', 1, -34, -58, 500);
INSERT INTO public.locations VALUES (2, 'Córdoba Capital', 2, -31, -64, 600);
INSERT INTO public.locations VALUES (3, 'Rosario', 3, -32, -60, 700);
INSERT INTO public.locations VALUES (4, 'Mendoza Capital', 4, -32, -68, 800);
INSERT INTO public.locations VALUES (5, 'Salta Capital', 5, -24, -65, 900);


--
-- TOC entry 4839 (class 0 OID 16428)
-- Dependencies: 224
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.provinces VALUES (1, 'Buenos Aires', 'Provincia de Buenos Aires', -34, -58, 1);
INSERT INTO public.provinces VALUES (2, 'Córdoba', 'Provincia de Córdoba', -31, -64, 2);
INSERT INTO public.provinces VALUES (3, 'Santa Fe', 'Provincia de Santa Fe', -31, -60, 3);
INSERT INTO public.provinces VALUES (4, 'Mendoza', 'Provincia de Mendoza', -32, -68, 4);
INSERT INTO public.provinces VALUES (5, 'Salta', 'Provincia de Salta', -24, -65, 5);


--
-- TOC entry 4841 (class 0 OID 16435)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Juan', 'Pérez', 'jperez', 'pass123');
INSERT INTO public.users VALUES (2, 'Ana', 'García', 'agarcia', 'pass456');
INSERT INTO public.users VALUES (3, 'Luis', 'Rodríguez', 'lrodriguez', 'pass789');
INSERT INTO public.users VALUES (4, 'María', 'López', 'mlopez', 'passabc');
INSERT INTO public.users VALUES (5, 'Pedro', 'Martínez', 'pmartinez', 'passxyz');
INSERT INTO public.users VALUES (6, 'Santiago', 'Colombet', 'Santicolombet', '1234');
INSERT INTO public.users VALUES (7, 'Santiago', 'Colombet', 'Santicolombet', '1234');
INSERT INTO public.users VALUES (8, 'Juan', 'Pérez', 'juanperez@email.com', '123456');
INSERT INTO public.users VALUES (9, 'Juan', 'Pérez', 'juanperez@email.com', '123456');
INSERT INTO public.users VALUES (10, 'hola', 'chau', 'holachau@email.com', '123456789');


--
-- TOC entry 4848 (class 0 OID 0)
-- Dependencies: 215
-- Name: event_enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_enrollments_id_seq', 1, false);


--
-- TOC entry 4849 (class 0 OID 0)
-- Dependencies: 217
-- Name: event_locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_locations_id_seq', 1, false);


--
-- TOC entry 4850 (class 0 OID 0)
-- Dependencies: 219
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 14, true);


--
-- TOC entry 4851 (class 0 OID 0)
-- Dependencies: 221
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 1, false);


--
-- TOC entry 4852 (class 0 OID 0)
-- Dependencies: 223
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provinces_id_seq', 1, false);


--
-- TOC entry 4853 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- TOC entry 4666 (class 2606 OID 16442)
-- Name: event_enrollments event_enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_pkey PRIMARY KEY (id_event);


--
-- TOC entry 4668 (class 2606 OID 16444)
-- Name: event_locations event_locations_id_id1_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT event_locations_id_id1_key UNIQUE (id);


--
-- TOC entry 4670 (class 2606 OID 16446)
-- Name: event_locations event_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT event_locations_pkey PRIMARY KEY (id_location);


--
-- TOC entry 4672 (class 2606 OID 16448)
-- Name: events events_id_id1_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_id_id1_key UNIQUE (id);


--
-- TOC entry 4674 (class 2606 OID 16496)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 4676 (class 2606 OID 16452)
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- TOC entry 4678 (class 2606 OID 16454)
-- Name: provinces provinces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_pkey PRIMARY KEY (id);


--
-- TOC entry 4680 (class 2606 OID 16456)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4681 (class 2606 OID 16457)
-- Name: event_enrollments event_enrollments_id_event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_id_event_fkey FOREIGN KEY (id_event) REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4682 (class 2606 OID 16462)
-- Name: event_enrollments event_enrollments_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4683 (class 2606 OID 16467)
-- Name: event_locations event_locations_id_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT event_locations_id_location_fkey FOREIGN KEY (id_location) REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4684 (class 2606 OID 16472)
-- Name: events events_id_creator_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_id_creator_user_fkey FOREIGN KEY (id_creator_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4685 (class 2606 OID 16477)
-- Name: events events_id_event_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_id_event_location_fkey FOREIGN KEY (id_event_location) REFERENCES public.event_locations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4686 (class 2606 OID 16482)
-- Name: locations locations_id_province_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_id_province_fkey FOREIGN KEY (id_province) REFERENCES public.provinces(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-07-18 10:46:13

--
-- PostgreSQL database dump complete
--

