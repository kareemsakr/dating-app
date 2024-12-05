CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      birthdate DATE NOT NULL,
      password TEXT NOT NULL
    );

CREATE TABLE IF NOT EXISTS profile (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        bio TEXT,
        looking_for TEXT,
        interests TEXT,
        tagline TEXT,
        location TEXT,
        avatar TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(user_id),
);
