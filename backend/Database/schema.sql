CREATE DATABASE api_acuerdos;

USE api_acuerdos;



CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE scopes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE role_scopes (
    role_id INT NOT NULL,
    scope_id INT NOT NULL,

    PRIMARY KEY (role_id, scope_id),

    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (scope_id) REFERENCES scopes(id)
);

CREATE TABLE acuerdos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    estado VARCHAR(150) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creada_por INT NOT NULL
);


INSERT INTO roles (name)
VALUES
('Lector'),
('Editor');

-- scopes
INSERT INTO scopes (name)
VALUES
('leer_acuerdos'),
('crear_acuerdos');

-- 
INSERT INTO role_scopes (role_id, scope_id)
VALUES
(1, 1), 
(2, 1),
(2, 2);


INSERT INTO users (name, email, password, role_id)
VALUES
('John Doe', 'john.lector@ejemplo.com', '123456', 1), -- Lector 
('Lis Dae', 'lis.editora@ejemplo.com', '123456', 2); -- Editor 