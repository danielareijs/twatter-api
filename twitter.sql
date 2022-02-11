CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name TEXT,
  username TEXT UNIQUE NOT NULL,
  password TEXT,
  description TEXT,
  image TEXT
);

CREATE TABLE tweets (
  ID SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id INT NOT NULL REFERENCES users (ID),
  message VARCHAR(255)
);

INSERT INTO users (name, username, password, description, image)
  VALUES
    ('Santa', 'santaclaus', '1234', 'The one and only, Santa Claus.', 'https://images.unsplash.com/photo-1561506694-f97e677ff3d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'),
    ('Donald', 'trump', '4321', 'I am Trump. you obviously know all about me already', 'https://images.unsplash.com/photo-1585246132506-0f3890089150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1090&q=80');

INSERT INTO tweets (user_id, message)
  VALUES
    (1, 'Hohoho! Merry Christmas!'),
    (1, '#fakenews'),
    (2, 'Did I win?');