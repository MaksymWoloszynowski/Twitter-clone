-- ========== USERS ==========
INSERT INTO users (username, email, password_hash, role, bio) VALUES
  ('alice', 'alice@example.com', 'hash1', 'user', 'Coffee lover and tech enthusiast'),
  ('bob', 'bob@example.com', 'hash2', 'user', 'Weekend traveler and foodie'),
  ('charlie', 'charlie@example.com', 'hash3', 'user', 'Node.js developer and musician'),
  ('diana', 'diana@example.com', 'hash4', 'user', 'Nature fan, loves hiking'),
  ('edward', 'edward@example.com', 'hash5', 'user', 'Avid reader and writer'),
  ('fiona', 'fiona@example.com', 'hash6', 'user', 'Late night coder'),
  ('george', 'george@example.com', 'hash7', 'user', 'Pizza connoisseur'),
  ('hannah', 'hannah@example.com', 'hash8', 'user', 'Sunset chaser'),
  ('ian', 'ian@example.com', 'hash9', 'user', 'Mountain hiker'),
  ('julia', 'julia@example.com', 'hash10', 'user', 'Music enthusiast'),
  ('kevin', 'kevin@example.com', 'hash11', 'user', 'Runner and fitness fan'),
  ('laura', 'laura@example.com', 'hash12', 'user', 'Food experimenter'),
  ('michael', 'michael@example.com', 'hash13', 'user', 'Movie buff'),
  ('nina', 'nina@example.com', 'hash14', 'user', 'Guitar learner'),
  ('oliver', 'oliver@example.com', 'hash15', 'user', 'Coffee vs tea debates'),
  ('paula', 'paula@example.com', 'hash16', 'user', 'Tech reader'),
  ('quincy', 'quincy@example.com', 'hash17', 'user', 'Grateful for friends'),
  ('rachel', 'rachel@example.com', 'hash18', 'user', 'Side project enthusiast'),
  ('steve', 'steve@example.com', 'hash19', 'user', 'Ice cream lover'),
  ('admin', 'admin@example.com', 'hash20', 'admin', 'Administrator account');

-- ========== TWEETS ==========
-- ========== TWEETS ==========
INSERT INTO tweets (user_id, content)
VALUES
  ((SELECT id FROM users WHERE username='alice'), 'Just had the best coffee of my life!'),
  ((SELECT id FROM users WHERE username='bob'), 'Can’t wait for the weekend.'),
  ((SELECT id FROM users WHERE username='charlie'), 'Learning Node.js is so much fun!'),
  ((SELECT id FROM users WHERE username='diana'), 'The weather today is amazing.'),
  ((SELECT id FROM users WHERE username='edward'), 'I finally finished that book I was reading.'),
  ((SELECT id FROM users WHERE username='fiona'), 'Coding late at night is the best.'),
  ((SELECT id FROM users WHERE username='george'), 'Does anyone know a good pizza place nearby?'),
  ((SELECT id FROM users WHERE username='hannah'), 'Watching the sunset by the lake.'),
  ((SELECT id FROM users WHERE username='ian'), 'I love hiking in the mountains.'),
  ((SELECT id FROM users WHERE username='julia'), 'Music is the best therapy.'),
  ((SELECT id FROM users WHERE username='kevin'), 'Just ran 5 miles, feeling great!'),
  ((SELECT id FROM users WHERE username='laura'), 'Trying out a new recipe tonight.'),
  ((SELECT id FROM users WHERE username='michael'), 'Who else is excited for the new movie release?'),
  ((SELECT id FROM users WHERE username='nina'), 'Started learning guitar, fingers hurt but it’s fun!'),
  ((SELECT id FROM users WHERE username='oliver'), 'Coffee or tea? I need opinions!'),
  ((SELECT id FROM users WHERE username='paula'), 'Reading some tech articles before bed.'),
  ((SELECT id FROM users WHERE username='quincy'), 'Feeling grateful for good friends today.'),
  ((SELECT id FROM users WHERE username='rachel'), 'Working on a side project, almost done!'),
  ((SELECT id FROM users WHERE username='steve'), 'Is it too late for ice cream?'),
  ((SELECT id FROM users WHERE username='admin'), 'Admin: remember to follow the rules!');

-- ========== COMMENTS ==========
INSERT INTO comments (tweet_id, user_id, content)
SELECT t.id, u.id, c.content
FROM tweets t
JOIN users u ON u.username='bob'
CROSS JOIN (VALUES
  ('I need that coffee place!'),
  ('Same here! Any plans?'),
  ('Node.js is awesome indeed!')
) AS c(content);

-- ========== LIKES ==========
INSERT INTO likes (user_id, tweet_id)
SELECT u.id, t.id
FROM users u
JOIN tweets t ON t.content LIKE '%coffee%'
LIMIT 5;

-- ========== FOLLOWS ==========
INSERT INTO follows (follower_id, following_id)
SELECT u1.id, u2.id
FROM users u1
JOIN users u2 ON u1.username <> u2.username
LIMIT 10;