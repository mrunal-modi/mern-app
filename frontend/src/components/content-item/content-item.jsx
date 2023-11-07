import "./content-item.scss";

const ContentItem = ({
    className = "",
    img,
    description,
    isLft,
    title
}) => {
    return (
        <div className={`${className} content ${isLft ? "lft" : ""}`}>
            <div className="container">
                <div className="content-body">
                    <div className="left">
                        <img src={img} className="img" alt="img" />
                    </div>
                    <div className="right">
                    <h3>
                    {title}
                </h3>
                        <p>
                            {description}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ContentItem;