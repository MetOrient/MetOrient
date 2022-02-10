import { TypeSelectItem } from 'src/types/select-types';

export enum enmSortOptionValues {
    low_to_high = 'low_to_high',
    high_to_low = 'high_to_low',
    most_viewed = 'most_viewed',
    most_liked = 'most_liked',
    most_recent = 'most_recent',
    oldest = 'oldest',
    ending_soon = 'ending_soon',
}

export const sortOptions: Array<TypeSelectItem> = [
    {
        label: 'Price: Low to high',
        value: enmSortOptionValues.low_to_high,
    },
    {
        label: 'Price: High to low',
        value: enmSortOptionValues.high_to_low,
    },
    {
        label: 'Most Viewed',
        value: enmSortOptionValues.most_viewed,
    },
    {
        label: 'Most Liked',
        value: enmSortOptionValues.most_liked,
    },
    {
        label: 'Most Recent',
        value: enmSortOptionValues.most_recent,
    },
    {
        label: 'Oldest',
        value: enmSortOptionValues.oldest,
    },
    {
        label: 'Ending Soon',
        value: enmSortOptionValues.ending_soon,
    },
];

export const mintNFTCategoryOptions: Array<TypeSelectItem> = [
    {
        label: 'Original',
        value: 'Original',
    },
    {
        label: 'Museum',
        value: 'Museum',
    },
    {
        label: 'Arts',
        value: 'Arts',
    },
    {
        label: 'Sports',
        value: 'Sports',
    },
    {
        label: 'Dimension',
        value: 'Dimension',
    },
    {
        label: 'Pets',
        value: 'Pets',
    },
    {
        label: 'Recreation',
        value: 'Recreation',
    },
    {
        label: 'Star',
        value: 'Star',
    },
    {
        label: 'Other',
        value: 'Other',
    },
];
