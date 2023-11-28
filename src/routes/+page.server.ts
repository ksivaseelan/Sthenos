import {conn} from '$lib/db/db';
import {PageInsights} from '$lib/db/schema';
import {eq} from "drizzle-orm";

export const load = async () => {
    return {streamed: {views: fetchviews()}}
}

const fetchviews = async () => {
    const insights = await conn
    .select()
    .from(PageInsights)
    .where(eq(PageInsights.id, 1));

    const views = ++insights[0].views;

    await conn
    .update(PageInsights)
    .set({views})
    .where(eq(PageInsights.id, 1))
    .returning()

    return views
}