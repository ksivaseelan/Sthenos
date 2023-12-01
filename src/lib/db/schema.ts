import { pgTable, serial, text, varchar, bigint } from "drizzle-orm/pg-core"

export const Chat = pgTable("chat", {
    id: serial("id").notNull(),
    content: text("content").notNull(),
});

export const user = pgTable("auth_user", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
    username: varchar("username", {
        length: 20
    })
});

export const session = pgTable("user_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const key = pgTable("user_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});

export const profile = pgTable("profile", {
    id: varchar("id", {
        length: 15
    }).primaryKey(),
    userId: varchar("user_id", {
        length: 15
    })
        .notNull()
        .references(() => user.id),
    height: varchar("height", {
        length: 15
    }),
    weight: varchar("weight", {
        length: 15
    }),
    age: varchar("age", {
        length: 15
    }),
    sex: varchar("sex", {
        length: 15
    }),
    fitnessLevel: varchar("fitness_level", {
        length: 15
    }),
    fitnessGoal: varchar("fitness_goal", {
        length: 15
    }),

})
