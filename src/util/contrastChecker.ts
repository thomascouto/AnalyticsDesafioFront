export default function contrastChecker(color: string) {
	const rgb = parseInt(color.substring(1), 16)
	const r = (rgb >> 16) & 0xff
	const g = (rgb >> 8) & 0xff
	const b = (rgb >> 0) & 0xff

	//WCAG definition of relative luminance
	//https://www.w3.org/WAI/GL/wiki/Relative_luminance#:~:text=in%20WCAG%202.-,x,%2B0.055)%2F1.055)%20%5E%202.4
	const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b

	return lum > 165 ? '#000' : '#FFF'
}
