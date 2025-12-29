CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========== USERS ==========
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    bio TEXT DEFAULT '',
    role TEXT DEFAULT 'user'
);

-- ========== TWEETS ==========
CREATE TABLE tweets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ========== COMMENTS ==========
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tweet_id UUID REFERENCES tweets(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ========== LIKES ==========
CREATE TABLE likes (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tweet_id UUID REFERENCES tweets(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, tweet_id)
);

-- ========== FOLLOWS ==========
CREATE TABLE follows (
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (follower_id, following_id)
);