import { createClient } from "next-sanity";
// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    apiVersion: '2023-05-03',
    dataset: 'production',
    projectId: '7a1591os',
    useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}