export const Picture = ({ source, alt, className, style }) => {
    return <img src={source} alt={alt} className={className ? className : ''} style={style} />
}
export default Picture;