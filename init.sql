create table if not exists users(
        user_id serial primary key,
        username varchar not null unique,
        password varchar not null,
        joined_date date not null
);

create table if not exists profiles (
        profile_id serial primary key,
        username varchar not null,
	pro_pic_ssskey varchar,
        number_workouts_completed integer not null,
        total_time_spent interval not null,
        constraint fk_username foreign key(username) references users(username) on delete cascade
);

create table if not exists workouts_completed(
        workout_completed_id serial primary key,
        username varchar not null,
        total_time_spent interval not null,
        clubs_exercise varchar not null,
        diamonds_exercise varchar not null,
        hearts_exercise varchar not null,
        spades_exercise varchar not null,
        aces_exercise varchar,
        breakout_aces boolean,
        timer_used boolean,
        aces_minutes_to_do integer,
        aces_seconds_to_do integer,
        time_spent interval,
        date_completed date,
        constraint fk_username foreign key(username) references users(username) on delete cascade
);

create table if not exists saved_custom_workouts(
        saved_custom_workout_id serial primary key,
        username varchar not null,
        name varchar not null,
        clubs_exercise varchar not null,
        diamonds_exercise varchar not null,
        hearts_exercise varchar not null,
        spades_exercise varchar not null,
        aces_exercise varchar,
        breakout_aces boolean,
        timer_used boolean,
        aces_minutes_to_do integer,
        aces_seconds_to_do integer,
        constraint fk_username foreign key(username) references users(username) on delete cascade
);

create table if not exists session(
        sid varchar primary key not null,
        sess json not null,
        expire timestamp(6) with time zone not null
);