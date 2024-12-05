CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      birthdate DATE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- TODO: Run migration
      is_active BOOLEAN DEFAULT TRUE
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
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE
);


CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Then create the trigger
CREATE TRIGGER update_profile_last_updated
    BEFORE UPDATE
    ON profile
    FOR EACH ROW
    EXECUTE FUNCTION update_last_updated_column();