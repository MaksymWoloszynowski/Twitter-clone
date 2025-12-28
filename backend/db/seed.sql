-- ========== USERS ==========
INSERT INTO users (username, email, password_hash, role, bio) VALUES
  ('alice', 'alice@example.com', 'hash1', 'user', 'Frontend developer who loves coffee and good books.'),
  ('bob', 'bob@example.com', 'hash2', 'user', 'Cat lover and software engineer who enjoys weekend hikes.'),
  ('charlie', 'charlie@example.com', 'hash3', 'user', 'Fullstack developer and part-time musician.'),
  ('diana', 'diana@example.com', 'hash4', 'user', 'Enjoys nature, reading, and exploring new places.'),
  ('edward', 'edward@example.com', 'user', 'hash5', 'Tech enthusiast who likes photography and travel.'),
  ('fiona', 'fiona@example.com', 'hash6', 'user', 'Late-night coder always experimenting with new ideas.'),
  ('george', 'george@example.com', 'hash7', 'user', 'Gamer and pizza fan, always up for a challenge.'),
  ('hannah', 'hannah@example.com', 'hash8', 'user', 'Enjoys sunsets, hiking, and discovering new trails.'),
  ('ian', 'ian@example.com', 'hash9', 'user', 'Love mountains, hiking, and capturing nature photos.'),
  ('julia', 'julia@example.com', 'hash10', 'user', 'Passionate about music and finding new bands to listen to.'),
  ('kevin', 'kevin@example.com', 'hash11', 'user', 'Runner and fitness enthusiast trying to stay healthy.'),
  ('laura', 'laura@example.com', 'hash12', 'user', 'Love experimenting with new recipes and cooking techniques.'),
  ('michael', 'michael@example.com', 'hash13', 'user', 'Big fan of movies and spending time outdoors on weekends.'),
  ('nina', 'nina@example.com', 'hash14', 'user', 'Learning guitar and enjoying creative hobbies.'),
  ('oliver', 'oliver@example.com', 'hash15', 'user', 'Coffee or tea? I enjoy both and like to try new blends.'),
  ('paula', 'paula@example.com', 'hash16', 'user', 'I like reading tech articles and working on side projects.'),
  ('quincy', 'quincy@example.com', 'hash17', 'user', 'Always grateful for good friends and new experiences.'),
  ('rachel', 'rachel@example.com', 'hash18', 'user', 'Working on personal projects keeps me motivated.'),
  ('steve', 'steve@example.com', 'hash19', 'user', 'I enjoy sweet treats and relaxing with friends.'),
  ('admin', 'admin@example.com', 'hash20', 'admin', 'Administrator of the platform, here to help users.');

-- ========== TWEETS ==========
INSERT INTO tweets (user_id, content) VALUES
  (1, 'Just had the best coffee of my life!'),
  (2, 'Can’t wait for the weekend.'),
  (3, 'Learning Node.js is so much fun!'),
  (4, 'The weather today is amazing.'),
  (5, 'I finally finished that book I was reading.'),
  (6, 'Coding late at night is the best.'),
  (7, 'Does anyone know a good pizza place nearby?'),
  (8, 'Watching the sunset by the lake.'),
  (9, 'I love hiking in the mountains.'),
  (10, 'Music is the best therapy.'),
  (11, 'Just ran 5 miles, feeling great!'),
  (12, 'Trying out a new recipe tonight.'),
  (13, 'Who else is excited for the new movie release?'),
  (14, 'Started learning guitar, fingers hurt but it’s fun!'),
  (15, 'Coffee or tea? I need opinions!'),
  (16, 'Reading some tech articles before bed.'),
  (17, 'Feeling grateful for good friends today.'),
  (18, 'Working on a side project, almost done!'),
  (19, 'Is it too late for ice cream?'),
  (20, 'Admin: remember to follow the rules!');

-- ========== COMMENTS ==========
INSERT INTO comments (tweet_id, user_id, content) VALUES
  (1, 2, 'I need that coffee place!'),
  (2, 3, 'Same here! Any plans?'),
  (3, 1, 'Node.js is awesome indeed!'),
  (4, 5, 'Perfect day for a walk.'),
  (5, 6, 'Which book did you read?'),
  (6, 7, 'Late night coding is the best.'),
  (7, 8, 'Try the one on Main Street.'),
  (8, 9, 'Beautiful view!'),
  (9, 10, 'Hiking is my favorite too.'),
  (10, 11, 'Music always cheers me up.');

-- ========== LIKES ==========
INSERT INTO likes (user_id, tweet_id) VALUES
  (2, 1),(3, 1),(4, 2),(5, 3),(6, 4),(7, 5),(8, 6),(9, 7),(10, 8),(11, 9),
  (12, 10),(13, 11),(14, 12),(15, 13),(16, 14),(17, 15),(18, 16),(19, 17),(20, 18),(1, 19);

-- ========== FOLLOWS ==========
INSERT INTO follows (follower_id, following_id) VALUES
  (1,2),(1,3),(2,1),(2,4),(3,1),(3,5),(4,2),(4,6),(5,3),(5,7),
  (6,4),(6,8),(7,5),(7,9),(8,6),(8,10),(9,7),(9,11),(10,8),(10,12);