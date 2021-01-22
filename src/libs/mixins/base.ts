const base = {
  color(color: string) {
    return {color}
  },
  width(width: number) {
    return {width}
  },
  height(height: number) {
    return { height }
  },
  fontSize(fontSize: number) {
    return { fontSize }
  },
  flex(flex: number) {
    return { flex }
  },
  gray() {
    return this.color('#AAB0B8')
  },
  black() {
    return this.color('#333')
  },
  orange() {
    return this.color('#FC6217')
  },
  white() {
    return this.color('#FFFFFF')
  },
  bgColor(color?: string) {
    return { backgroundColor: color || 'red'}
  },
  border(width?: number, color?: string, radius?: number) {
    return {
      borderWidth: width || 1,
      borderColor: color || '#ccc',
      borderRadius: radius || 4,
    }
  },
  flexRow() {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    }
  }
}
export default base