const SingleMessage = () => {
    return (
        <>
            <div className="d-flex">
                <div className="img-container">
                    <img src="./assets/feed/cactus-avatar.jpg" alt="User Avatar" />
                </div>
                <div className="single-message-container d-flex flex-column p-2 align-self-end">
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. tenetur commodi fugit! Magnam!</span>
                    <div className="time ml-auto">20:56</div>
                </div>
            </div>
            <div className="d-flex ml-auto">
                <div className="single-message-container d-flex flex-column p-2 align-self-end">
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. tenetur commodi fugit! Magnam!</span>
                    <div className="time ml-auto">20:57</div>
                </div>
            </div>
        </>
    )
}

export default SingleMessage