import { client, urlFor } from "@/lib/sanity";
import { fullBlog } from "@/lib/interface";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

async function getData(slug: string) {
    const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
        "currentSlug": slug.current,
        title,
        content,
        titleImage,
    }[0]`;

    const data = await client.fetch(query);
    return data;
}

export default async function BlogArticle({
        params,
    } : {
        params: { slug: string };
    }) {
    // giving the `data` a type of fullBlog
    const data: fullBlog = await getData(params.slug);
    return (
        <div>
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">Jan Marshal - Blog</span>
                <span className="mt-4 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
            </h1>

            <Image src={urlFor(data.titleImage).url()} priority alt="main image" width={800} height={400} className="rounded-lg object-cover mt-10"/>

            <div className="mt-16 mb-16 prose prose-blue prose-m dark:prose-invert prose-li:marker:text-primary">
                <PortableText value={data.content} />
            </div>
        </div>
    );
}