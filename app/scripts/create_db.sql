CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      birthdate DATE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP,
      is_active BOOLEAN DEFAULT TRUE,
      gender VARCHAR(255),
      is_admin BOOLEAN DEFAULT FALSE,
      CONSTRAINT gender_check CHECK (gender IN ('male', 'female', 'other'))
    );

CREATE TABLE IF NOT EXISTS profile (
        user_id UUID PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES users(id),
        bio TEXT,
        looking_for TEXT,
        interests TEXT,
        location TEXT,
        avatar_url TEXT,
        non_negotiables TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS match_requests (
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at TIMESTAMP,
    status VARCHAR(255),
    CONSTRAINT status_check CHECK (status IN ('pending', 'closed')),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS  matches (
    user1 UUID PRIMARY KEY,
    FOREIGN KEY (user1) REFERENCES users(id),
    user2 UUID,
    FOREIGN KEY (user2) REFERENCES users(id),
    UNIQUE (user1, user2),
    created_at TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Function to set created_at timestamp
CREATE OR REPLACE FUNCTION set_created_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Example of applying trigger to a table
-- You'll need to repeat this for each table
CREATE TRIGGER set_created_at_timestamp
    BEFORE INSERT ON your_table_name
    FOR EACH ROW
    EXECUTE FUNCTION set_created_at();