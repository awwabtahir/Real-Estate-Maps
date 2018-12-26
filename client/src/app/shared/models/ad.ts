export interface ad {
    _id?: number,
    invId?: string,
    userId: string,
    area: string,
    areaType: string,
    biz_comm: object,
    demand: string,
    comment: string,
    title: string,
    description: string,
    healthcare: object,
    vidUrl: string,
    imagesData: object,
    locationData: object,
    nearby_loc: object,
    other: object,
    plot_features?: object,
    propNumber: string,
    rooms: object,
    street: string,
    type: string,
    subtype: string
}