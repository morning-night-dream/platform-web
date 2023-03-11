import useSWR, { useSWRConfig } from 'swr';

import type { V1ListArticleResponse } from '../openapi';
import type { Article } from '../openapi/api';
import { articleApiClient } from '../api/client';

// 1回に取得する記事の数
const articlesPerPage = 20;

type ArticlesState = {
    data: Article[];
    error?: Error;
    currentIndex?: string;
};

const articlesState: ArticlesState = {
    data: [],
};

export const useListArticles = () => {
    const key = `/api/v1/articles`;

    const fetcher = async () => articleApiClient.v1ListArticles(
        articlesPerPage,
        articlesState.currentIndex ?? '',
    );
    const { data } = useSWR(key, fetcher);

    const fetchedArticles = data?.data.articles ?? [];
    const existIds = new Set(articlesState.data.map((d) => d.id));
    const additionalArticles = fetchedArticles.filter((d) => !existIds.has(d.id));
    articlesState.data.push(...additionalArticles);

    // NextPageTokenが空の場合、もうこれ以上データがないのでcurrentIndexを更新しない
    if (!(data?.data.nextPageToken === '')) {
        articlesState.currentIndex = data?.data.nextPageToken;
    }

    const { mutate } = useSWRConfig();

    return {
        data: articlesState.data,
        async mutate() {
            await mutate(key);
        },
    };
};
