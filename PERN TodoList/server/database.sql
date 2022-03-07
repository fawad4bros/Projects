CREATE DATABASE pernstack;

--In order to use the uuid_generate_v4() function we will set the extension.
CREATE TABLE todo(
    todo_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    description VARCHAR(255)
);