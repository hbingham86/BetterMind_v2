export interface Journal {
    title: string;
    journalBody: string;
    mood: string;
    id: number;
    updatedAt?: any;
}

export interface JournalsResponse {
    data: {
        journals: Journal[];
    };
    meta: {
        count: number;
        currentPage: number;
        limit: number;
        totalPages: number;
    };
    message: string;
}

export interface GetJournalsParams {
    page: number;
    limit: number;
    mood: string;
    search: string;
}
