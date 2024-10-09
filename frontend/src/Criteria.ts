export default class Criteria {
    title: string;
    ratingCount: number;
    ratings;
    active: boolean; // used to toggle widget vs edit view

    constructor(title = "", ratingCount = 1) {
        this.title = title;
        this.ratingCount = ratingCount;
        this.ratings = this.initializeRatings(ratingCount);
        this.active = false;
    }

    initializeRatings(ratingCount: number) {
        const ratingsArray = [];
        // Create ratingCount number of ratings
        for (let i = 0; i < ratingCount; i++) {
            ratingsArray.push({
                points: 0,
                description: "",
            });
        }
        // Return the array of rating objects
        return ratingsArray;
    }

    setRatingCount(count: number) {
        this.ratingCount = count;
    }

    setTitle(title: string) {
        this.title = title;
    }
}
