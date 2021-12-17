
export type uploadImageType = {
    data: {
        link: string
    },
    error: null,
    success: boolean
}

export type sectionDtoType = {
    hideInMobile: false,
    positionAt: number,
    parentId: number,
    goodsSectionTranslates: {
        langId: number,
        translateName: string
    }[]
}