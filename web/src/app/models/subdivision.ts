export interface Subdivision {
    id: number;
    code: string;
    name: string;
    longitude: number;
    latitude: number;
    fieldSurveyTerritoryId: number;
    marketId: number;
    subdivisionStatusId: number;
    surveyMethodId: number;
    activeSections: number;
    futureSections: number;
    builtOutSections: number;
    totalLots: number;
    fieldSurveyTerritoryName: string;
    marketName: string;
    marketAbbreviation: string;
    subdivisionStatusCode: string;
    surveyMethodCode: string;
    county: string;
    community: string;
    zoom17Date: string;
    zoom18Date: string;
    subdivisionGeometryId: null | string,
    subdivisionGeometryBoundingBoxId: null | string,
    subdivisionGeometryBoundaryId: null | string,
    subdivisionGeometryIntelligenceBoundaryId: number;
    subdivisionGeometryIntelligenceBoundaryStatusId: number;
    subdivisionGeometryIntelligenceBoundaryStatusCode: string;
    subdivisionGeometryIntelligenceBoundaryStatusChangeDate: string;
    nearMapImageDate: string;
    imageBoxId: number;
    mostRecentIPointBatchDate: string;
    iPoints: null | string,
    validatediPoints: null | string,
    subdivisionSpecificStatus: string
}

export interface SubdivisionResponse {
    subdivisions: Array<Subdivision>;
    totalRecords: number
}

export interface Options {
    value: string;
    viewValue: string;
}

export interface Filter {
    start: number;
    limit: number; 
    filter: string; 
    sortorder: string; 
    sortby: string;
}