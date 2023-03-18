import { useState } from 'react';
import { Grid, GridItem, Center, Heading, Box, Button } from '@chakra-ui/react';
import { Header } from '../Header';
import { useV1ListArticles } from '../../api';
import { ArticleCard } from './ArticleCard';

export function Article() {
    const [currentIndex, setCurrentIndex] = useState('');
    const { data } = useV1ListArticles({
        pageToken: currentIndex,
        maxPageSize: 20,
    });

    return (
        <>
            <Header />
            <Grid templateColumns="repeat(12, 1fr)">
                <GridItem colSpan={2} />
                <GridItem gap={4} colSpan={8}>
                    <Box m={4}>
                        <Heading>Articles</Heading>
                    </Box>
                    <Center>
                        <Grid
                            gap={6}
                            templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
                        >
                            {data?.articles?.map((article) => {
                                return (
                                    <GridItem key={article.id} colSpan={1}>
                                        <ArticleCard
                                            thumbnailURL={article.thumbnail}
                                            // TODO 必ず存在するプロパティはopenapi.yamlでrequiredにする
                                            url={article.url ?? ''}
                                            title={article.title ?? ''}
                                        />
                                    </GridItem>
                                );
                            })}
                        </Grid>
                    </Center>
                    <Button
                        onClick={() => {
                            setCurrentIndex(data?.nextPageToken ?? '');
                        }}
                    >
                        Read More
                    </Button>
                </GridItem>
                <GridItem colSpan={2} />
            </Grid>
        </>
    );
}
