export interface PictureDimensions {
	width: number
	height: number
}
export const getDummyPictureUrl = (seed: string, dims: PictureDimensions) => {
	return `https://picsum.photos/seed/${seed}/${dims.width}/${dims.height}`
}
